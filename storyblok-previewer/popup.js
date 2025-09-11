// Storyblok Quick Manager - Main Script
class StoryblokManager {
    constructor() {
        this.accessToken = '';
        this.spaceId = '';
        this.stories = [];
        this.spaceName = '';
        this.init();
    }

    // Initialize the application
    async init() {
        this.bindEvents();
        await this.loadSavedCredentials();
    }

    // Bind all event listeners
    bindEvents() {
        // Setup section events
        document.getElementById('connect-btn').addEventListener('click', () => this.connectToStoryblok());
        
        // Content section events
        document.getElementById('refresh-btn').addEventListener('click', () => this.refreshStories());
        document.getElementById('new-story-btn').addEventListener('click', () => this.createNewStory());
        document.getElementById('open-space-btn').addEventListener('click', () => this.openSpace());
        document.getElementById('filter-select').addEventListener('change', (e) => this.filterStories(e.target.value));
        
        // Bottom actions
        document.getElementById('settings-btn').addEventListener('click', () => this.showSettings());
        document.getElementById('disconnect-btn').addEventListener('click', () => this.disconnect());

        // Enter key support for inputs
        document.getElementById('access-token').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.connectToStoryblok();
        });
        document.getElementById('space-id').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.connectToStoryblok();
        });
    }

    // Load saved credentials from storage
    async loadSavedCredentials() {
        try {
            const result = await chrome.storage.sync.get(['storyblok_token', 'storyblok_space']);
            if (result.storyblok_token && result.storyblok_space) {
                this.accessToken = result.storyblok_token;
                this.spaceId = result.storyblok_space;
                this.showContentSection();
                await this.loadSpaceInfo();
                await this.loadStories();
            } else {
                this.showSetupSection();
            }
        } catch (error) {
            console.error('Error loading credentials:', error);
            this.showSetupSection();
        }
    }

    // Connect to Storyblok with provided credentials
    async connectToStoryblok() {
        const token = document.getElementById('access-token').value.trim();
        const space = document.getElementById('space-id').value.trim();

        if (!token || !space) {
            this.showStatus('Please fill in both fields', 'error');
            return;
        }

        this.showStatus('Connecting to Storyblok...', 'success');

        try {
            // Validate credentials by making a test API call
            const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${token}&per_page=1`);
            
            if (!response.ok) {
                throw new Error('Invalid credentials or API error');
            }

            // Save credentials
            await chrome.storage.sync.set({
                storyblok_token: token,
                storyblok_space: space
            });

            this.accessToken = token;
            this.spaceId = space;

            this.showContentSection();
            await this.loadSpaceInfo();
            await this.loadStories();
            this.showStatus('Connected successfully!', 'success');

        } catch (error) {
            console.error('Connection error:', error);
            this.showStatus('Connection failed. Please check your credentials.', 'error');
        }
    }

    // Load space information
    async loadSpaceInfo() {
        try {
            const response = await fetch(`https://api.storyblok.com/v2/cdn/spaces/me?token=${this.accessToken}`);
            if (response.ok) {
                const data = await response.json();
                this.spaceName = data.space?.name || `Space ${this.spaceId}`;
                document.getElementById('space-name').textContent = this.spaceName;
            }
        } catch (error) {
            console.error('Error loading space info:', error);
            document.getElementById('space-name').textContent = `Space ${this.spaceId}`;
        }
    }

    // Load stories from Storyblok
    async loadStories() {
        try {
            this.showLoadingState();
            
            const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?token=${this.accessToken}&per_page=20&sort_by=updated_at:desc`);
            
            if (!response.ok) {
                throw new Error('Failed to load stories');
            }

            const data = await response.json();
            this.stories = data.stories || [];
            
            this.updateStoryCount();
            this.displayStories(this.stories);
            
            if (this.stories.length === 0) {
                this.showEmptyState();
            }

        } catch (error) {
            console.error('Error loading stories:', error);
            this.showErrorState('Failed to load stories. Please check your connection.');
        }
    }

    // Display stories in the UI
    displayStories(stories) {
        const container = document.getElementById('stories-container');
        
        if (stories.length === 0) {
            this.showEmptyState();
            return;
        }

        container.innerHTML = '';

        stories.forEach(story => {
            const storyElement = this.createStoryElement(story);
            container.appendChild(storyElement);
        });
    }

    // Create a single story element
    createStoryElement(story) {
        const storyDiv = document.createElement('div');
        storyDiv.className = 'story-item';
        
        const isPublished = story.published_at !== null;
        const statusClass = isPublished ? 'published' : 'draft';
        const statusText = isPublished ? 'Published' : 'Draft';
        
        const updatedDate = new Date(story.updated_at).toLocaleDateString();
        
        storyDiv.innerHTML = `
            <div class="story-info">
                <div class="story-title" title="${this.escapeHtml(story.name)}">
                    ${this.escapeHtml(story.name)}
                </div>
                <div class="story-meta">
                    <span class="story-status ${statusClass}">${statusText}</span>
                    <span>•</span>
                    <span>Updated ${updatedDate}</span>
                </div>
            </div>
            <div class="story-actions">
                <button class="story-action-btn" onclick="storyblokManager.editStory('${story.id}')" title="Edit Story">
                    ✏️
                </button>
                <button class="story-action-btn" onclick="storyblokManager.previewStory('${story.full_slug}')" title="Preview Story">
                    👁️
                </button>
                <button class="story-action-btn" onclick="storyblokManager.copyStoryUrl('${story.full_slug}')" title="Copy URL">
                    🔗
                </button>
            </div>
        `;

        return storyDiv;
    }

    // Filter stories based on status
    filterStories(filterType) {
        let filteredStories;
        
        switch (filterType) {
            case 'published':
                filteredStories = this.stories.filter(story => story.published_at !== null);
                break;
            case 'draft':
                filteredStories = this.stories.filter(story => story.published_at === null);
                break;
            default:
                filteredStories = this.stories;
        }
        
        this.displayStories(filteredStories);
    }

    // Quick action: Edit story in Storyblok
    editStory(storyId) {
        const url = `https://app.storyblok.com/#!/me/spaces/${this.spaceId}/stories/0/0/${storyId}`;
        chrome.tabs.create({ url });
        window.close();
    }

    // Quick action: Preview story on live site
    previewStory(slug) {
        const url = `https://spatial-story.netlify.app/${slug}`;
        chrome.tabs.create({ url });
        window.close();
    }

    // Quick action: Copy story URL to clipboard
    async copyStoryUrl(slug) {
        try {
            const url = `https://spatial-story.netlify.app/${slug}`;
            await navigator.clipboard.writeText(url);
            this.showStatus(`✅ URL copied for: ${slug}`, 'success');
            setTimeout(() => window.close(), 1500);
        } catch (error) {
            console.error('Error copying URL:', error);
            this.showStatus('Failed to copy URL', 'error');
        }
    }

    // Quick action: Create new story
    createNewStory() {
        const url = `https://app.storyblok.com/#!/me/spaces/${this.spaceId}/stories/new`;
        chrome.tabs.create({ url });
        window.close();
    }

    // Quick action: Open Storyblok space
    openSpace() {
        // Go to the main space dashboard using modern URL format
        const url = `https://app.storyblok.com/#/me/spaces/${this.spaceId}`;
        chrome.tabs.create({ url });
        this.showStatus('Opening your Storyblok space...', 'success');
        setTimeout(() => window.close(), 1000);
    }

    // Refresh stories
    async refreshStories() {
        this.showStatus('Refreshing stories...', 'success');
        await this.loadStories();
        this.showStatus('Stories refreshed!', 'success');
    }

    // Show settings (go back to setup)
    showSettings() {
        this.showSetupSection();
        // Pre-fill current values (but mask token)
        document.getElementById('space-id').value = this.spaceId;
        document.getElementById('access-token').value = ''; // Don't pre-fill for security
    }

    // Disconnect and clear stored data
    async disconnect() {
        try {
            await chrome.storage.sync.clear();
            this.accessToken = '';
            this.spaceId = '';
            this.stories = [];
            this.showSetupSection();
            this.showStatus('Disconnected successfully', 'success');
        } catch (error) {
            console.error('Error disconnecting:', error);
            this.showStatus('Error during disconnect', 'error');
        }
    }

    // UI State Management
    showSetupSection() {
        document.getElementById('setup-section').classList.remove('hidden');
        document.getElementById('content-section').classList.add('hidden');
    }

    showContentSection() {
        document.getElementById('setup-section').classList.add('hidden');
        document.getElementById('content-section').classList.remove('hidden');
    }

    showLoadingState() {
        document.getElementById('stories-container').innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading your stories...</p>
            </div>
        `;
    }

    showEmptyState() {
        document.getElementById('stories-container').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p><strong>No stories found</strong></p>
                <p>Create your first story in Storyblok to get started!</p>
            </div>
        `;
    }

    showErrorState(message) {
        document.getElementById('stories-container').innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <p><strong>Error Loading Stories</strong></p>
                <p>${this.escapeHtml(message)}</p>
                <button class="btn secondary" onclick="storyblokManager.refreshStories()" style="margin-top: 12px; width: auto; padding: 8px 16px;">
                    Try Again
                </button>
            </div>
        `;
    }

    updateStoryCount() {
        document.getElementById('story-count').textContent = this.stories.length;
    }

    // Status message system
    showStatus(message, type = 'success') {
        const statusBar = document.getElementById('status-bar');
        const statusMessage = document.getElementById('status-message');
        
        statusMessage.textContent = message;
        statusBar.className = `status-bar ${type}`;
        statusBar.classList.remove('hidden');

        // Auto-hide after 3 seconds
        setTimeout(() => {
            statusBar.classList.add('hidden');
        }, 3000);
    }

    // Utility function to escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the application when DOM is loaded
let storyblokManager;

document.addEventListener('DOMContentLoaded', () => {
    storyblokManager = new StoryblokManager();
});