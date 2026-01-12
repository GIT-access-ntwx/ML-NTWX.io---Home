
"use client";

import React, { useState } from 'react';
import styles from './aeo.module.css';

interface ContentData {
    productName: string;
    category: string;
    audience: string;
    features: string;
    price: string;
    affiliateLink: string;
    pros: string;
    cons: string;
}

interface Scores {
    aeo: number;
    citation: number;
    readability: number;
    affiliate: number;
}

export default function AeoGeneratorPage() {
    const [template, setTemplate] = useState('review');
    const [formData, setFormData] = useState<ContentData>({
        productName: '',
        category: '',
        audience: '',
        features: '',
        price: '',
        affiliateLink: '',
        pros: '',
        cons: '',
    });
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [scores, setScores] = useState<Scores | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const getScoreClass = (score: number) => {
        if (score >= 85) return styles.excellent;
        if (score >= 70) return styles.good;
        if (score >= 60) return styles.fair;
        return styles.poor;
    };

    const generateTemplate = (selectedTemplate: string, data: any) => {
        const year = new Date().getFullYear();
        const featureList = data.features.split('\n').filter((f: string) => f.trim());
        const proList = data.pros.split('\n').filter((p: string) => p.trim());
        const conList = data.cons.split('\n').filter((c: string) => c.trim());

        // Helper to join array into HTML
        const listToHtml = (items: string[], wrapper: (item: string) => string) => items.map(wrapper).join('');

        if (selectedTemplate === 'review') {
            return `
        <h1>Is ${data.productName} Worth It? Honest Review ${year}</h1>
        
        <p><strong>Quick answer:</strong> Yes, the ${data.productName} is worth it for ${data.audience} looking for ${featureList[0] || 'quality performance'}. At ${data.price}, it delivers exceptional value compared to competitors in the ${data.category} category.</p>

        <p>We tested the ${data.productName} for 30 days to see if it lives up to the hype. Here's what we found:</p>

        <h2>What We Liked</h2>
        ${listToHtml(proList, pro => `<p>✅ <strong>${pro}</strong></p>`)}

        <h2>What Could Be Better</h2>
        ${listToHtml(conList, con => `<p>❌ ${con}</p>`)}

        <h2>Key Features</h2>
        <ul>
            ${listToHtml(featureList, f => `<li>${f}</li>`)}
        </ul>

        <h2>Should You Buy It?</h2>
        
        <p><strong>Buy if you:</strong></p>
        <ul>
            <li>Need reliable ${data.category.toLowerCase()}</li>
            <li>Value quality over price</li>
            <li>Want something that lasts</li>
        </ul>

        <p><strong>Skip if you:</strong></p>
        <ul>
            <li>On a tight budget</li>
            <li>${conList[0] || 'Looking for different features'}</li>
        </ul>

        <p><strong>Current price: ${data.price}</strong> — <a href="${data.affiliateLink}" class="affiliate-link" target="_blank">Check latest price and availability</a></p>

        <h2>Frequently Asked Questions</h2>
        
        <p><strong>Q: How does ${data.productName} compare to competitors?</strong></p>
        <p>A: The ${data.productName} outperforms most competitors in the ${data.category} category, particularly in ${featureList[0] || 'performance'}. While priced at ${data.price}, it offers better value than higher-priced alternatives.</p>

        <p><strong>Q: Is ${data.productName} worth the price?</strong></p>
        <p>A: Yes, especially for ${data.audience}. The combination of ${proList[0] || 'quality'} and ${proList[1] || 'durability'} justify the ${data.price} price point.</p>

        <hr style="border: 1px solid #3a3a3a; margin: 30px 0;">
        <p style="font-size: 0.9em; color: #888;"><em>Disclosure: This article contains affiliate links. If you purchase through our links, we may earn a commission at no extra cost to you. This helps us test more products and keep our reviews unbiased.</em></p>
      `;
        } else if (selectedTemplate === 'best') {
            return `
        <h1>Best ${data.category} for ${year}: Top Picks Tested</h1>
        
        <p><strong>Quick answer:</strong> The ${data.productName} is our top pick for best ${data.category.toLowerCase()} in ${year}. After testing multiple options, it stands out for ${featureList[0] || 'performance'} at ${data.price}.</p>

        <h2>Our Top Picks</h2>
        
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Best For</th>
                    <th>Price</th>
                    <th>Rating</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${data.productName}</td>
                    <td>${data.audience}</td>
                    <td>${data.price}</td>
                    <td>⭐⭐⭐⭐⭐ 4.8/5</td>
                </tr>
            </tbody>
        </table>

        <h2>1. ${data.productName} - Best Overall</h2>
        
        <p><strong>Price:</strong> ${data.price} — <a href="${data.affiliateLink}" class="affiliate-link" target="_blank">Check current price</a></p>

        <p><strong>Why we love it:</strong></p>
        ${listToHtml(proList, pro => `<p>✅ ${pro}</p>`)}

        <p><strong>Keep in mind:</strong></p>
        ${listToHtml(conList, con => `<p>❌ ${con}</p>`)}

        <p><strong>Who it's for:</strong> ${data.audience} who want ${featureList[0] || 'quality'} without compromising on ${featureList[1] || 'value'}.</p>

        <h2>How We Tested</h2>
        <p>We spent 60 days testing ${data.category.toLowerCase()} from top brands. Our testing included real-world use, durability tests, and comparisons across key features like ${featureList.slice(0, 3).join(', ')}.</p>

        <h2>Buying Guide: What to Look For</h2>
        <ul>
            ${listToHtml(featureList, f => `<li><strong>${f}:</strong> Important for overall performance</li>`)}
        </ul>

        <hr style="border: 1px solid #3a3a3a; margin: 30px 0;">
        <p style="font-size: 0.9em; color: #888;"><em>Disclosure: This article contains affiliate links. If you purchase through our links, we may earn a commission at no extra cost to you.</em></p>
      `;
        } else if (selectedTemplate === 'comparison') {
            return `
            <h1>${data.productName} vs Competitors: Which is Better in ${year}?</h1>
            <p>We define the details...</p>
            <p>Comparing ${data.productName} against the top alternatives in the ${data.category} market.</p>
        `;
        } else if (selectedTemplate === 'guide') {
            return `
            <h1>How to Choose the Best ${data.category} (${year} Guide)</h1>
            <p>Everything you need to know about buying ${data.category.toLowerCase()}.</p>
            <p>We feature ${data.productName} as a prime example of what to look for.</p>
        `;
        }

        return '<p>Template content not implemented yet.</p>';
    };

    const generateContent = () => {
        if (!formData.productName || !formData.category) {
            alert('Please fill in at least Product Name and Category');
            return;
        }

        setIsLoading(true);
        setScores(null);

        // Simulate API call
        setTimeout(() => {
            const content = generateTemplate(template, formData);
            setGeneratedContent(content);

            setScores({
                aeo: Math.floor(Math.random() * 20) + 75,
                citation: Math.floor(Math.random() * 20) + 75,
                readability: Math.floor(Math.random() * 20) + 80,
                affiliate: Math.floor(Math.random() * 20) + 70
            });

            setIsLoading(false);
        }, 2000);
    };

    const copyToClipboard = () => {
        if (!generatedContent) {
            alert('Generate content first');
            return;
        }
        // Strip HTML for clipboard or keep it? The original app copies innerText.
        // However, if we want to copy the HTML code itself, we should copy generatedContent.
        // The original app: document.getElementById('outputPreview').innerText
        // So it copies the rendered text. Let's do the same for now to match behavior, 
        // BUT usually content generators want you to copy the HTML for your blog. 
        // Let's stick to the original behavior: text content.
        // Wait, the original button says "Copy to Clipboard" and "Export as HTML".
        // Usually "Copy" copies the text to paste into a doc, "Export" downloads the file.
        // Ideally we might want a "Copy HTML" button too. For now let's reproduce the exact behavior.

        // Creating a temporary element to get innerText from the HTML string
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = generatedContent;
        const text = tempDiv.innerText;

        navigator.clipboard.writeText(text).then(() => {
            alert('✓ Content copied to clipboard!');
        });
    };

    const exportHTML = () => {
        if (!generatedContent) {
            alert('Generate content first');
            return;
        }
        const blob = new Blob([generatedContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ai-optimized-content.html';
        link.click();
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>⚡ AEO/GEO Content Generator</h1>
                <div className={styles.subtitle}>Create AI-optimized affiliate content in minutes</div>
            </div>

            <div className={styles.mainLayout}>
                {/* Input Section */}
                <div className={styles.card}>
                    <h2>📝 Content Settings</h2>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Choose Template</label>
                        <div className={styles.templateSelector}>
                            {[
                                { id: 'review', icon: '📋', title: 'Review', desc: '"Is [Product] Worth It?"' },
                                { id: 'comparison', icon: '⚖️', title: 'Comparison', desc: '"[A] vs [B]"' },
                                { id: 'best', icon: '🏆', title: 'Best List', desc: '"Best [Products] 2025"' },
                                { id: 'guide', icon: '📚', title: 'Guide', desc: '"How to Choose [Product]"' },
                            ].map(t => (
                                <div
                                    key={t.id}
                                    className={`${styles.templateOption} ${template === t.id ? styles.selected : ''}`}
                                    onClick={() => setTemplate(t.id)}
                                >
                                    <h3>{t.icon} {t.title}</h3>
                                    <p>{t.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            className={styles.input}
                            placeholder="e.g., Patagonia Nano Puff Jacket"
                            value={formData.productName}
                            onChange={handleInputChange}
                        />
                        <div className={styles.helpText}>Main product you're writing about</div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Category</label>
                        <input
                            type="text"
                            id="category"
                            className={styles.input}
                            placeholder="e.g., Winter Jackets, Wireless Headphones"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Target Audience</label>
                        <input
                            type="text"
                            id="audience"
                            className={styles.input}
                            placeholder="e.g., Outdoor enthusiasts, Budget shoppers"
                            value={formData.audience}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Key Features (one per line)</label>
                        <textarea
                            id="features"
                            className={styles.textarea}
                            placeholder="Lightweight design&#10;Water-resistant&#10;Packable"
                            value={formData.features}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Price</label>
                        <input
                            type="text"
                            id="price"
                            className={styles.input}
                            placeholder="$199"
                            value={formData.price}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Affiliate Link</label>
                        <input
                            type="url"
                            id="affiliateLink"
                            className={styles.input}
                            placeholder="https://amzn.to/xyz123"
                            value={formData.affiliateLink}
                            onChange={handleInputChange}
                        />
                        <div className={styles.helpText}>Your tracked affiliate URL</div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Pros (one per line)</label>
                        <textarea
                            id="pros"
                            className={styles.textarea}
                            placeholder="Extremely warm&#10;Lightweight and packable&#10;Durable construction"
                            value={formData.pros}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Cons (one per line)</label>
                        <textarea
                            id="cons"
                            className={styles.textarea}
                            placeholder="Expensive&#10;Runs small"
                            value={formData.cons}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={generateContent}>
                        🚀 Generate AI-Optimized Content
                    </button>
                </div>

                {/* Output Section */}
                <div className={styles.card}>
                    <h2>📊 AI Optimization Score</h2>

                    <div className={styles.scoreCard}>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>AEO Score</span>
                            <span className={`${styles.scoreValue} ${scores ? getScoreClass(scores.aeo) : ''}`}>
                                {scores ? `${scores.aeo}/100` : '--'}
                            </span>
                        </div>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>Citation Potential</span>
                            <span className={`${styles.scoreValue} ${scores ? getScoreClass(scores.citation) : ''}`}>
                                {scores ? `${scores.citation}/100` : '--'}
                            </span>
                        </div>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>Readability</span>
                            <span className={`${styles.scoreValue} ${scores ? getScoreClass(scores.readability) : ''}`}>
                                {scores ? `${scores.readability}/100` : '--'}
                            </span>
                        </div>
                        <div className={styles.scoreItem}>
                            <span className={styles.scoreLabel}>Affiliate Integration</span>
                            <span className={`${styles.scoreValue} ${scores ? getScoreClass(scores.affiliate) : ''}`}>
                                {scores ? `${scores.affiliate}/100` : '--'}
                            </span>
                        </div>
                    </div>

                    {isLoading && (
                        <div className={`${styles.loading} ${styles.active}`}>
                            <div className={styles.spinner}></div>
                            <p>Generating AI-optimized content...</p>
                        </div>
                    )}

                    {!isLoading && (
                        <>
                            <h2 style={{ marginTop: '30px' }}>👁️ Content Preview</h2>
                            <div className={styles.outputPreview} dangerouslySetInnerHTML={{ __html: generatedContent || '<p style="text-align: center; color: #666; padding: 40px;">Fill in the form and click "Generate" to see your AI-optimized content here.</p>' }}></div>
                        </>
                    )}

                    <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={copyToClipboard}>
                        📋 Copy to Clipboard
                    </button>
                    <button className={`${styles.btn} ${styles.btnSecondary}`} onClick={exportHTML}>
                        💾 Export as HTML
                    </button>
                </div>
            </div>

            <div className={`${styles.card} ${styles.fullWidth}`} style={{ marginTop: '30px' }}>
                <h2>💡 AI Optimization Tips</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    <div style={{ background: '#0a0a0a', padding: '15px', borderRadius: '8px' }}>
                        <h3 style={{ color: '#00ffff', marginBottom: '10px' }}>✅ Direct Answer First</h3>
                        <p style={{ color: '#b0b0b0', fontSize: '0.9em' }}>Put your main recommendation in the first 100 words so AI can cite it easily.</p>
                    </div>
                    <div style={{ background: '#0a0a0a', padding: '15px', borderRadius: '8px' }}>
                        <h3 style={{ color: '#00ffff', marginBottom: '10px' }}>📊 Use Comparison Tables</h3>
                        <p style={{ color: '#b0b0b0', fontSize: '0.9em' }}>Structured data helps AI extract and cite your content accurately.</p>
                    </div>
                    <div style={{ background: '#0a0a0a', padding: '15px', borderRadius: '8px' }}>
                        <h3 style={{ color: '#00ffff', marginBottom: '10px' }}>🎯 Specific Data Points</h3>
                        <p style={{ color: '#b0b0b0', fontSize: '0.9em' }}>Use numbers and measurements. "12-hour battery" beats "long battery life".</p>
                    </div>
                    <div style={{ background: '#0a0a0a', padding: '15px', borderRadius: '8px' }}>
                        <h3 style={{ color: '#00ffff', marginBottom: '10px' }}>🔗 Natural Link Placement</h3>
                        <p style={{ color: '#b0b0b0', fontSize: '0.9em' }}>Place affiliate links after establishing value, not before.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
