console.log('🎯 Storyblok Extension Content Script Loaded');

// Content script to handle preview modal
let previewModal = null;

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log('📨 Message received in content script:', request);
    
    if (request.action === 'openPreview') {
        console.log('🎬 Opening preview modal...');
        openPreviewModal(request);
        sendResponse({ success: true, message: 'Preview modal opened' });
    } else {
        console.log('❓ Unknown action:', request.action);
        sendResponse({ success: false, message: 'Unknown action' });
    }
    
    return true; // Keep message channel open
});

async function openPreviewModal({ accessToken, spaceId, storySlug, device }) {
    try {
        console.log('🚀 Starting preview modal creation...');
        console.log('📝 Parameters:', { spaceId, storySlug, device, tokenLength: accessToken.length });
        
        // Remove existing modal
        if (previewModal) {
            console.log('🗑️ Removing existing modal');
            previewModal.remove();
        }

        // Try to fetch story content (try draft first, then published)
        console.log('📡 Fetching story data...');
        let response = await fetch(`https://api.storyblok.com/v2/cdn/stories/${storySlug}?token=${accessToken}&version=draft`);
        
        if (!response.ok) {
            console.log('📡 Draft not found, trying published...');
            response = await fetch(`https://api.storyblok.com/v2/cdn/stories/${storySlug}?token=${accessToken}&version=published`);
        }
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Story fetch failed:', errorData);
            throw new Error(`Story "${storySlug}" not found. Check if the story exists and slug is correct.`);
        }

        const data = await response.json();
        const story = data.story;
        console.log('✅ Story loaded:', story.name);

        // Create modal
        console.log('🎨 Creating modal...');
        createPreviewModal(story, device, spaceId, accessToken);
        console.log('✅ Modal created successfully');

    } catch (error) {
        console.error('❌ Preview error:', error);
        showNotification('Error: ' + error.message, 'error');
    }
}

function createPreviewModal(story, device, spaceId, accessToken) {
    console.log('🎨 Building modal HTML...');
    
    const modal = document.createElement('div');
    modal.id = 'storyblok-preview-modal';
    modal.innerHTML = `
        <div class="preview-backdrop">
            <div class="preview-container ${device}">
                <div class="preview-header">
                    <div class="preview-info">
                        <h3>📖 ${story.name || story.slug}</h3>
                        <span class="device-label">${device.charAt(0).toUpperCase() + device.slice(1)} Preview</span>
                    </div>
                    <div class="preview-controls">
                        <button class="device-switch" data-device="mobile">📱</button>
                        <button class="device-switch" data-device="tablet">🖥️</button>
                        <button class="device-switch" data-device="desktop">💻</button>
                        <button class="close-btn">✕</button>
                    </div>
                </div>
                <div class="preview-content">
                    <div class="loading-message">Loading preview...</div>
                    <iframe 
                        src="about:blank" 
                        frameborder="0"
                        onload="this.previousElementSibling.style.display='none'">
                    </iframe>
                </div>
            </div>
        </div>
    `;

    // Add styles
    const styles = document.createElement('style');
    styles.textContent = `
        #storyblok-preview-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2147483647;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .preview-backdrop {
            background: rgba(0, 0, 0, 0.9);
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .preview-container {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
            transition: all 0.3s ease;
        }

        .preview-container.mobile {
            width: 375px;
            height: 667px;
        }

        .preview-container.tablet {
            width: 768px;
            height: 1024px;
            max-height: 80vh;
        }

        .preview-container.desktop {
            width: 90vw;
            height: 80vh;
            max-width: 1200px;
        }

        .preview-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .preview-info h3 {
            margin: 0 0 5px 0;
            font-size: 16px;
            font-weight: 600;
        }

        .device-label {
            font-size: 12px;
            opacity: 0.8;
        }

        .preview-controls {
            display: flex;
            gap: 8px;
            align-items: center;
        }

        .device-switch, .close-btn {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 8px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            transition: background 0.2s;
        }

        .device-switch:hover, .close-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .preview-content {
            height: calc(100% - 70px);
            position: relative;
        }

        .loading-message {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 16px;
            color: #666;
            z-index: 10;
        }

        .preview-content iframe {
            width: 100%;
            height: 100%;
            border: none;
            background: white;
        }

        @media (max-width: 768px) {
            .preview-container.desktop,
            .preview-container.tablet {
                width: 95vw;
                height: 80vh;
            }
        }
    `;

    console.log('🎨 Adding styles and modal to page...');
    document.head.appendChild(styles);
    document.body.appendChild(modal);
    previewModal = modal;

    // Get the iframe and set its source after a delay
    const iframe = modal.querySelector('iframe');
    setTimeout(() => {
        const previewUrl = `https://app.storyblok.com/#!/me/spaces/${spaceId}/stories/0/0/${story.id}?tab=visual_editor&token=${accessToken}`;
        console.log('🖼️ Setting iframe URL:', previewUrl);
        iframe.src = previewUrl;
    }, 100);

    // Add event listeners
    modal.querySelector('.close-btn').addEventListener('click', () => {
        console.log('❌ Close button clicked');
        modal.remove();
        previewModal = null;
    });

    // Device switching
    modal.querySelectorAll('.device-switch').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('📱 Device switch clicked:', btn.dataset.device);
            const newDevice = btn.dataset.device;
            const container = modal.querySelector('.preview-container');
            const label = modal.querySelector('.device-label');
            
            container.className = `preview-container ${newDevice}`;
            label.textContent = `${newDevice.charAt(0).toUpperCase() + newDevice.slice(1)} Preview`;
        });
    });

    // Close on backdrop click
    modal.querySelector('.preview-backdrop').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) {
            console.log('🖱️ Backdrop clicked - closing modal');
            modal.remove();
            previewModal = null;
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape' && previewModal) {
            console.log('⌨️ Escape key pressed - closing modal');
            modal.remove();
            previewModal = null;
            document.removeEventListener('keydown', escapeHandler);
        }
    });

    console.log('✅ Modal setup complete');
}

function showNotification(message, type) {
    console.log(`📢 Showing notification: ${message} (${type})`);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#f8d7da' : '#d4edda'};
        color: ${type === 'error' ? '#721c24' : '#155724'};
        border: 1px solid ${type === 'error' ? '#f5c6cb' : '#c3e6cb'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2147483648;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        max-width: 350px;
        font-weight: 500;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 6000);
}