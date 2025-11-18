// ===================================
// RESOURCE HUB SYSTEM
// ===================================

class ResourceHub {
    constructor() {
        this.documents = this.initializeDocuments();
        this.glossaryTerms = this.initializeGlossary();
        this.bibliography = this.initializeBibliography();
        this.init();
    }

    init() {
        this.createDocumentViewer();
        this.createInteractiveMaps();
        this.createGlossary();
        this.createBibliography();
        this.createStudyGuides();
    }

    // ===================================
    // Primary Source Document Viewer
    // ===================================
    initializeDocuments() {
        return [
            {
                id: 'harris-letter-1838',
                title: 'Martin Harris Letter to Editor, 1838',
                date: '1838-01-15',
                type: 'letter',
                author: 'Martin Harris',
                description: 'Letter explaining his separation from the church',
                content: 'To the Editor: I feel it my duty to explain to the public my reasons for leaving the Church of Jesus Christ of Latter-day Saints...',
                tags: ['harris', 'excommunication', 'testimony'],
                citation: 'Harris, Martin. Letter to Editor. Cleveland Advertiser, January 15, 1838.'
            },
            {
                id: 'witness-testimony-1830',
                title: 'The Testimony of Three Witnesses',
                date: '1830-03-01',
                type: 'testimony',
                author: 'Oliver Cowdery, David Whitmer, Martin Harris',
                description: 'Original testimony as published in the Book of Mormon',
                content: 'Be it known unto all nations, kindreds, tongues, and people, unto whom this work shall come...',
                tags: ['witnesses', 'testimony', 'book-of-mormon'],
                citation: 'The Book of Mormon. Palmyra, NY: E.B. Grandin, 1830.'
            },
            {
                id: 'lucy-harris-testimony',
                title: 'Lucy Harris Testimony, 1833',
                date: '1833-11-29',
                type: 'testimony',
                author: 'Lucy Harris',
                description: 'Martin Harris\'s wife testifies about the lost manuscript',
                content: 'I have been called upon to state what I know about the Book of Mormon...',
                tags: ['lucy-harris', 'lost-manuscript', 'skepticism'],
                citation: 'Howe, E.D. Mormonism Unvailed. Painesville, OH, 1834.'
            },
            {
                id: 'anthon-letter',
                title: 'Charles Anthon Letter, 1834',
                date: '1834-02-17',
                type: 'letter',
                author: 'Charles Anthon',
                description: 'Professor Anthon\'s account of Martin Harris\'s visit',
                content: 'Dear Sir: I received this morning your favor of the 9th instant...',
                tags: ['anthon', 'characters', 'translation'],
                citation: 'Anthon, Charles. Letter to E.D. Howe, February 17, 1834.'
            },
            {
                id: 'strang-revelation',
                title: 'James Strang\'s Letter of Appointment',
                date: '1844-06-18',
                type: 'revelation',
                author: 'James J. Strang',
                description: 'Strang\'s claimed revelation appointing him successor',
                content: 'Verily thus saith the Lord unto my servant James J. Strang...',
                tags: ['strang', 'succession', 'revelation'],
                citation: 'Strang, James J. The Book of the Law of the Lord. Voree, WI, 1851.'
            }
        ];
    }

    createDocumentViewer() {
        const resourcesSection = document.getElementById('resources');
        if (!resourcesSection) return;

        const viewerHTML = `
            <div class="document-viewer-section">
                <h3 class="section-subtitle">Primary Source Documents</h3>
                <p>Explore original letters, testimonies, and firsthand accounts from restoration history</p>

                <div class="document-interface">
                    <div class="document-sidebar">
                        <div class="document-search">
                            <input type="text" id="doc-search" placeholder="Search documents..." class="search-input">
                        </div>

                        <div class="document-filters">
                            <select id="doc-type-filter" class="filter-select">
                                <option value="">All Types</option>
                                <option value="letter">Letters</option>
                                <option value="testimony">Testimonies</option>
                                <option value="revelation">Revelations</option>
                                <option value="newspaper">Newspaper Articles</option>
                            </select>
                        </div>

                        <div id="document-list" class="document-list">
                            ${this.renderDocumentList()}
                        </div>
                    </div>

                    <div class="document-viewer-main">
                        <div id="document-display" class="document-display">
                            <div class="no-document-selected">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="16" y1="13" x2="8" y2="13"/>
                                    <line x1="16" y1="17" x2="8" y2="17"/>
                                    <line x1="10" y1="9" x2="8" y2="9"/>
                                </svg>
                                <p>Select a document to view</p>
                            </div>
                        </div>

                        <div class="document-tools">
                            <button id="zoom-in" class="tool-btn" title="Zoom In">🔍+</button>
                            <button id="zoom-out" class="tool-btn" title="Zoom Out">🔍−</button>
                            <button id="download-doc" class="tool-btn" title="Download" disabled>📥</button>
                            <button id="print-doc" class="tool-btn" title="Print" disabled>🖨️</button>
                            <button id="cite-doc" class="tool-btn" title="Cite" disabled>📖</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const container = resourcesSection.querySelector('.container');
        if (container) {
            const resourcesGrid = container.querySelector('.resources-grid');
            if (resourcesGrid) {
                resourcesGrid.insertAdjacentHTML('afterend', viewerHTML);
                this.attachDocumentListeners();
            }
        }
    }

    renderDocumentList() {
        return this.documents.map(doc => `
            <div class="document-list-item" data-doc-id="${doc.id}">
                <h5>${doc.title}</h5>
                <div class="doc-meta">
                    <span class="doc-type">${doc.type}</span>
                    <span class="doc-date">${new Date(doc.date).getFullYear()}</span>
                </div>
                <p class="doc-author">${doc.author}</p>
            </div>
        `).join('');
    }

    attachDocumentListeners() {
        // Document selection
        document.querySelectorAll('.document-list-item').forEach(item => {
            item.addEventListener('click', () => {
                const docId = item.dataset.docId;
                this.displayDocument(docId);

                // Update active state
                document.querySelectorAll('.document-list-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Search
        const searchInput = document.getElementById('doc-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.searchDocuments(e.target.value));
        }

        // Filter
        const filterSelect = document.getElementById('doc-type-filter');
        if (filterSelect) {
            filterSelect.addEventListener('change', (e) => this.filterDocuments(e.target.value));
        }

        // Tools
        document.getElementById('zoom-in')?.addEventListener('click', () => this.zoomDocument(1.1));
        document.getElementById('zoom-out')?.addEventListener('click', () => this.zoomDocument(0.9));
        document.getElementById('download-doc')?.addEventListener('click', () => this.downloadDocument());
        document.getElementById('print-doc')?.addEventListener('click', () => this.printDocument());
        document.getElementById('cite-doc')?.addEventListener('click', () => this.showCitation());
    }

    displayDocument(docId) {
        const doc = this.documents.find(d => d.id === docId);
        if (!doc) return;

        const display = document.getElementById('document-display');
        if (!display) return;

        display.innerHTML = `
            <div class="document-header">
                <h3>${doc.title}</h3>
                <div class="document-metadata">
                    <span><strong>Date:</strong> ${new Date(doc.date).toLocaleDateString()}</span>
                    <span><strong>Author:</strong> ${doc.author}</span>
                    <span><strong>Type:</strong> ${doc.type}</span>
                </div>
            </div>

            <div class="document-content" id="doc-content">
                <div class="document-text">
                    ${doc.content}
                </div>
            </div>

            <div class="document-footer">
                <h4>Description</h4>
                <p>${doc.description}</p>

                <h4>Tags</h4>
                <div class="document-tags">
                    ${doc.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>

                <h4>Citation</h4>
                <p class="citation-text">${doc.citation}</p>
            </div>
        `;

        this.currentDocument = doc;

        // Enable tools
        document.getElementById('download-doc').disabled = false;
        document.getElementById('print-doc').disabled = false;
        document.getElementById('cite-doc').disabled = false;
    }

    searchDocuments(query) {
        const filtered = this.documents.filter(doc =>
            doc.title.toLowerCase().includes(query.toLowerCase()) ||
            doc.author.toLowerCase().includes(query.toLowerCase()) ||
            doc.tags.some(tag => tag.includes(query.toLowerCase()))
        );

        this.updateDocumentList(filtered);
    }

    filterDocuments(type) {
        const filtered = type ? this.documents.filter(doc => doc.type === type) : this.documents;
        this.updateDocumentList(filtered);
    }

    updateDocumentList(docs) {
        const list = document.getElementById('document-list');
        if (!list) return;

        list.innerHTML = docs.map(doc => `
            <div class="document-list-item" data-doc-id="${doc.id}">
                <h5>${doc.title}</h5>
                <div class="doc-meta">
                    <span class="doc-type">${doc.type}</span>
                    <span class="doc-date">${new Date(doc.date).getFullYear()}</span>
                </div>
                <p class="doc-author">${doc.author}</p>
            </div>
        `).join('');

        this.attachDocumentListeners();
    }

    zoomDocument(factor) {
        const content = document.getElementById('doc-content');
        if (!content) return;

        const currentSize = parseFloat(window.getComputedStyle(content).fontSize);
        content.style.fontSize = (currentSize * factor) + 'px';
    }

    downloadDocument() {
        if (!this.currentDocument) return;

        const content = `
${this.currentDocument.title}
Author: ${this.currentDocument.author}
Date: ${this.currentDocument.date}

${this.currentDocument.content}

Citation: ${this.currentDocument.citation}
        `;

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.currentDocument.id}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    }

    printDocument() {
        if (!this.currentDocument) return;
        window.print();
    }

    showCitation() {
        if (!this.currentDocument) return;

        const modal = document.createElement('div');
        modal.className = 'modal citation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Citation Formats</h3>
                    <button class="btn-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="citation-formats">
                        <div class="citation-format">
                            <h4>Chicago Style</h4>
                            <p class="citation-text">${this.currentDocument.citation}</p>
                            <button class="btn-secondary btn-sm copy-citation" data-text="${this.currentDocument.citation}">Copy</button>
                        </div>

                        <div class="citation-format">
                            <h4>MLA Style</h4>
                            <p class="citation-text">${this.convertToMLA(this.currentDocument)}</p>
                            <button class="btn-secondary btn-sm copy-citation" data-text="${this.convertToMLA(this.currentDocument)}">Copy</button>
                        </div>

                        <div class="citation-format">
                            <h4>APA Style</h4>
                            <p class="citation-text">${this.convertToAPA(this.currentDocument)}</p>
                            <button class="btn-secondary btn-sm copy-citation" data-text="${this.convertToAPA(this.currentDocument)}">Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.btn-close').addEventListener('click', () => modal.remove());

        modal.querySelectorAll('.copy-citation').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.text;
                navigator.clipboard.writeText(text);
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = 'Copy', 2000);
            });
        });
    }

    convertToMLA(doc) {
        return `${doc.author}. "${doc.title}." ${doc.date}.`;
    }

    convertToAPA(doc) {
        return `${doc.author} (${new Date(doc.date).getFullYear()}). ${doc.title}.`;
    }

    // ===================================
    // Interactive Maps
    // ===================================
    createInteractiveMaps() {
        const mapHTML = `
            <div class="interactive-maps-section">
                <h3 class="section-subtitle">Interactive Historical Maps</h3>
                <p>Explore the geographic context of restoration history</p>

                <div class="map-selector">
                    <button class="map-btn active" data-map="new-york">Early New York</button>
                    <button class="map-btn" data-map="midwest">Midwest Migration</button>
                    <button class="map-btn" data-map="utah">Utah Territory</button>
                    <button class="map-btn" data-map="worldwide">Worldwide Movements</button>
                </div>

                <div class="map-container">
                    <div id="interactive-map" class="map-display">
                        ${this.createNewYorkMap()}
                    </div>

                    <div class="map-legend">
                        <h4>Legend</h4>
                        <div class="legend-item">
                            <span class="legend-marker birthplace"></span>
                            <span>Birthplace</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-marker church"></span>
                            <span>Church/Meeting House</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-marker significant"></span>
                            <span>Significant Event</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-marker migration"></span>
                            <span>Migration Route</span>
                        </div>
                    </div>
                </div>

                <div class="map-info" id="map-info">
                    <p>Click on locations to learn more</p>
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            const container = resourcesSection.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', mapHTML);
                this.attachMapListeners();
            }
        }
    }

    createNewYorkMap() {
        return `
            <svg viewBox="0 0 800 600" class="historical-map">
                <!-- Background -->
                <rect width="800" height="600" fill="#f5f5dc"/>

                <!-- Water bodies -->
                <path d="M 100,50 Q 150,40 200,50 L 200,600" fill="#b3d9ff" opacity="0.5"/>
                <ellipse cx="400" cy="200" rx="80" ry="40" fill="#b3d9ff" opacity="0.5"/>

                <!-- Locations -->
                <g class="map-location" data-location="palmyra">
                    <circle cx="300" cy="250" r="8" fill="#8B4513" class="location-marker"/>
                    <text x="300" y="270" text-anchor="middle" font-size="14">Palmyra</text>
                </g>

                <g class="map-location" data-location="fayette">
                    <circle cx="350" cy="280" r="8" fill="#D4AF37" class="location-marker"/>
                    <text x="350" y="300" text-anchor="middle" font-size="14">Fayette</text>
                </g>

                <g class="map-location" data-location="harmony">
                    <circle cx="250" cy="350" r="8" fill="#8B4513" class="location-marker"/>
                    <text x="250" y="370" text-anchor="middle" font-size="14">Harmony</text>
                </g>

                <g class="map-location" data-location="kirtland">
                    <circle cx="450" cy="300" r="8" fill="#D4AF37" class="location-marker"/>
                    <text x="450" y="320" text-anchor="middle" font-size="14">Kirtland</text>
                </g>

                <!-- Harris Farm -->
                <g class="map-location" data-location="harris-farm">
                    <rect x="295" y="235" width="10" height="10" fill="#FF6347"/>
                    <text x="300" y="230" text-anchor="middle" font-size="12">Harris Farm</text>
                </g>

                <!-- Migration routes -->
                <path d="M 300,250 Q 375,265 450,300" stroke="#8B4513" stroke-width="2" stroke-dasharray="5,5" fill="none" opacity="0.6"/>

                <!-- Labels -->
                <text x="400" y="40" text-anchor="middle" font-size="20" font-weight="bold">Early Restoration Sites in New York</text>
            </svg>
        `;
    }

    attachMapListeners() {
        // Map selection
        document.querySelectorAll('.map-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const mapType = e.target.dataset.map;
                this.switchMap(mapType);
            });
        });

        // Location markers
        document.querySelectorAll('.map-location').forEach(location => {
            location.addEventListener('click', (e) => {
                const locationName = e.currentTarget.dataset.location;
                this.showLocationInfo(locationName);
            });

            location.style.cursor = 'pointer';
        });
    }

    switchMap(mapType) {
        const mapDisplay = document.getElementById('interactive-map');
        if (!mapDisplay) return;

        const maps = {
            'new-york': this.createNewYorkMap(),
            'midwest': '<p class="map-placeholder">Midwest migration map coming soon</p>',
            'utah': '<p class="map-placeholder">Utah territory map coming soon</p>',
            'worldwide': '<p class="map-placeholder">Worldwide movements map coming soon</p>'
        };

        mapDisplay.innerHTML = maps[mapType] || maps['new-york'];
        this.attachMapListeners();
    }

    showLocationInfo(location) {
        const info = {
            'palmyra': {
                name: 'Palmyra, New York',
                description: 'Site of the Book of Mormon publication and early church organization. Martin Harris was a prominent citizen here.',
                significance: 'The E.B. Grandin Print Shop published the first 5,000 copies of the Book of Mormon in 1830, financed by Martin Harris.'
            },
            'harris-farm': {
                name: 'Martin Harris Farm',
                description: 'Martin Harris mortgaged this 150-acre farm for $3,000 to publish the Book of Mormon.',
                significance: 'This significant financial sacrifice demonstrated Harris\'s commitment to the work, though it led to years of financial hardship.'
            },
            'fayette': {
                name: 'Fayette, New York',
                description: 'Home of the Whitmer family and location of the church\'s official organization on April 6, 1830.',
                significance: 'The Three Witnesses had their experience viewing the golden plates near here.'
            },
            'harmony': {
                name: 'Harmony, Pennsylvania',
                description: 'Home of Joseph and Emma Smith during much of the translation work.',
                significance: 'Martin Harris brought the 116 manuscript pages here, which were subsequently lost.'
            },
            'kirtland': {
                name: 'Kirtland, Ohio',
                description: 'Early church headquarters and site of the first temple.',
                significance: 'Martin Harris was excommunicated here in 1837 during the financial crisis.'
            }
        };

        const mapInfo = document.getElementById('map-info');
        const locationData = info[location];

        if (mapInfo && locationData) {
            mapInfo.innerHTML = `
                <h4>${locationData.name}</h4>
                <p><strong>Description:</strong> ${locationData.description}</p>
                <p><strong>Significance:</strong> ${locationData.significance}</p>
            `;
        }
    }

    // ===================================
    // Glossary of Terms
    // ===================================
    initializeGlossary() {
        return [
            {
                term: 'Seer Stone',
                definition: 'A stone used for divination and receiving revelations. Joseph Smith and others in the early 19th century used seer stones for treasure seeking and later for translation work.',
                relatedTerms: ['scrying', 'divining rod', 'folk magic']
            },
            {
                term: 'Three Witnesses',
                definition: 'Oliver Cowdery, David Whitmer, and Martin Harris, who testified to seeing the golden plates and an angel.',
                relatedTerms: ['Eight Witnesses', 'testimony', 'golden plates']
            },
            {
                term: 'Burned-Over District',
                definition: 'Western New York region known for intense religious revivals in the early 1800s. So many revivals occurred that the region was metaphorically "burned over."',
                relatedTerms: ['Second Great Awakening', 'revivalism', 'religious enthusiasm']
            },
            {
                term: 'Restoration',
                definition: 'The belief that the original Christian church needed to be restored after centuries of apostasy. Multiple groups claimed to be the restored church.',
                relatedTerms: ['primitivism', 'apostasy', 'succession crisis']
            },
            {
                term: 'Strangites',
                definition: 'Followers of James J. Strang, who claimed succession after Joseph Smith\'s death. Martin Harris briefly joined this movement.',
                relatedTerms: ['succession crisis', 'Beaver Island', 'James Strang']
            },
            {
                term: 'Folk Magic',
                definition: 'Popular magical practices in early America including treasure seeking, divining, and use of magical objects. Common in Martin Harris\'s community.',
                relatedTerms: ['seer stone', 'treasure seeking', 'divining rod']
            },
            {
                term: 'Lost 116 Pages',
                definition: 'The first portion of the Book of Mormon translation, given to Martin Harris to show his wife, which were subsequently lost.',
                relatedTerms: ['Martin Harris', 'Lucy Harris', 'manuscript']
            },
            {
                term: 'Spiritual Eyes',
                definition: 'Martin Harris\'s term for describing his witness experience - seeing with spiritual rather than natural vision.',
                relatedTerms: ['testimony', 'Three Witnesses', 'vision']
            }
        ];
    }

    createGlossary() {
        const glossaryHTML = `
            <div class="glossary-section">
                <h3 class="section-subtitle">Glossary of Terms</h3>
                <p>Search and explore key terms in restoration history</p>

                <div class="glossary-search">
                    <input type="text" id="glossary-search" placeholder="Search terms..." class="search-input">
                </div>

                <div class="glossary-alphabet">
                    ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter =>
                        `<button class="alphabet-btn" data-letter="${letter}">${letter}</button>`
                    ).join('')}
                    <button class="alphabet-btn active" data-letter="all">All</button>
                </div>

                <div id="glossary-list" class="glossary-list">
                    ${this.renderGlossaryTerms(this.glossaryTerms)}
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            const container = resourcesSection.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', glossaryHTML);
                this.attachGlossaryListeners();
            }
        }
    }

    renderGlossaryTerms(terms) {
        return terms.sort((a, b) => a.term.localeCompare(b.term))
            .map(item => `
                <div class="glossary-item">
                    <h4 class="glossary-term">${item.term}</h4>
                    <p class="glossary-definition">${item.definition}</p>
                    ${item.relatedTerms.length > 0 ? `
                        <div class="related-terms">
                            <strong>Related:</strong> ${item.relatedTerms.join(', ')}
                        </div>
                    ` : ''}
                </div>
            `).join('');
    }

    attachGlossaryListeners() {
        // Search
        const searchInput = document.getElementById('glossary-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                const filtered = this.glossaryTerms.filter(term =>
                    term.term.toLowerCase().includes(query) ||
                    term.definition.toLowerCase().includes(query)
                );
                this.updateGlossary(filtered);
            });
        }

        // Alphabet navigation
        document.querySelectorAll('.alphabet-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.alphabet-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');

                const letter = e.target.dataset.letter;
                this.filterGlossaryByLetter(letter);
            });
        });
    }

    filterGlossaryByLetter(letter) {
        const filtered = letter === 'all'
            ? this.glossaryTerms
            : this.glossaryTerms.filter(term => term.term.toUpperCase().startsWith(letter));

        this.updateGlossary(filtered);
    }

    updateGlossary(terms) {
        const list = document.getElementById('glossary-list');
        if (!list) return;

        list.innerHTML = terms.length > 0
            ? this.renderGlossaryTerms(terms)
            : '<p class="no-results">No terms found</p>';
    }

    // ===================================
    // Bibliography
    // ===================================
    initializeBibliography() {
        return [
            {
                id: 'vogel-emh',
                type: 'book',
                author: 'Vogel, Dan',
                title: 'Early Mormon History',
                year: 2004,
                publisher: 'Signature Books',
                location: 'Salt Lake City, UT',
                category: 'General History'
            },
            {
                id: 'bushman-rmj',
                type: 'book',
                author: 'Bushman, Richard L.',
                title: 'Rough Stone Rolling: A Cultural Biography of Mormonism\'s Founder',
                year: 2005,
                publisher: 'Alfred A. Knopf',
                location: 'New York',
                category: 'Biography'
            },
            {
                id: 'quinn-magic',
                type: 'book',
                author: 'Quinn, D. Michael',
                title: 'Early Mormonism and the Magic World View',
                year: 1998,
                publisher: 'Signature Books',
                location: 'Salt Lake City, UT',
                category: 'Folk Magic'
            }
        ];
    }

    createBibliography() {
        const biblioHTML = `
            <div class="bibliography-section">
                <h3 class="section-subtitle">Bibliography & Citations</h3>
                <p>Curated list of scholarly sources on restoration history</p>

                <div class="bibliography-filters">
                    <select id="biblio-category" class="filter-select">
                        <option value="">All Categories</option>
                        <option value="General History">General History</option>
                        <option value="Biography">Biography</option>
                        <option value="Folk Magic">Folk Magic</option>
                        <option value="Witnesses">Witnesses</option>
                    </select>

                    <select id="biblio-type" class="filter-select">
                        <option value="">All Types</option>
                        <option value="book">Books</option>
                        <option value="article">Articles</option>
                        <option value="thesis">Theses</option>
                    </select>
                </div>

                <div id="bibliography-list" class="bibliography-list">
                    ${this.renderBibliography(this.bibliography)}
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            const container = resourcesSection.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', biblioHTML);
                this.attachBibliographyListeners();
            }
        }
    }

    renderBibliography(items) {
        return items.map(item => `
            <div class="bibliography-item">
                <p class="biblio-citation">${this.formatBibliographyEntry(item)}</p>
                <div class="biblio-actions">
                    <span class="biblio-category">${item.category}</span>
                    <button class="btn-sm copy-citation" data-citation="${this.formatBibliographyEntry(item)}">
                        Copy Citation
                    </button>
                </div>
            </div>
        `).join('');
    }

    formatBibliographyEntry(item) {
        return `${item.author}. <em>${item.title}</em>. ${item.location}: ${item.publisher}, ${item.year}.`;
    }

    attachBibliographyListeners() {
        // Copy citations
        document.querySelectorAll('.copy-citation').forEach(btn => {
            btn.addEventListener('click', () => {
                const citation = btn.dataset.citation;
                navigator.clipboard.writeText(citation);
                btn.textContent = 'Copied!';
                setTimeout(() => btn.textContent = 'Copy Citation', 2000);
            });
        });
    }

    // ===================================
    // Study Guide Generator
    // ===================================
    createStudyGuides() {
        const guidesHTML = `
            <div class="study-guides-section">
                <h3 class="section-subtitle">Downloadable Study Guides</h3>
                <p>Comprehensive guides for in-depth study</p>

                <div class="study-guides-grid">
                    <div class="study-guide-card">
                        <h4>Martin Harris: A Life in Review</h4>
                        <p>Complete biographical study guide with primary sources and discussion questions</p>
                        <button class="btn-primary generate-guide" data-guide="harris-bio">
                            Generate PDF
                        </button>
                    </div>

                    <div class="study-guide-card">
                        <h4>The Three Witnesses Compared</h4>
                        <p>Comparative analysis of all Three Witnesses testimonies and life paths</p>
                        <button class="btn-primary generate-guide" data-guide="three-witnesses">
                            Generate PDF
                        </button>
                    </div>

                    <div class="study-guide-card">
                        <h4>Restoration Timeline & Sources</h4>
                        <p>Chronological guide with primary source excerpts and historical context</p>
                        <button class="btn-primary generate-guide" data-guide="timeline">
                            Generate PDF
                        </button>
                    </div>

                    <div class="study-guide-card">
                        <h4>Folk Magic in Early America</h4>
                        <p>Cultural context guide with examples and historical background</p>
                        <button class="btn-primary generate-guide" data-guide="folk-magic">
                            Generate PDF
                        </button>
                    </div>
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            const container = resourcesSection.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', guidesHTML);

                document.querySelectorAll('.generate-guide').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const guideType = btn.dataset.guide;
                        this.generateStudyGuidePDF(guideType);
                    });
                });
            }
        }
    }

    generateStudyGuidePDF(guideType) {
        // Simulated PDF generation - would use a library like jsPDF in production
        const guides = {
            'harris-bio': {
                title: 'Martin Harris: A Life in Review',
                content: 'Comprehensive biographical study guide...'
            },
            'three-witnesses': {
                title: 'The Three Witnesses Compared',
                content: 'Comparative analysis guide...'
            },
            'timeline': {
                title: 'Restoration Timeline & Sources',
                content: 'Chronological guide...'
            },
            'folk-magic': {
                title: 'Folk Magic in Early America',
                content: 'Cultural context guide...'
            }
        };

        const guide = guides[guideType];

        if (!guide) return;

        // Open in new window (simulating PDF download)
        const pdfWindow = window.open('', '_blank');
        pdfWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${guide.title}</title>
                <style>
                    body {
                        font-family: Georgia, serif;
                        max-width: 800px;
                        margin: 40px auto;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    h1 {
                        color: #8B4513;
                        border-bottom: 3px solid #D4AF37;
                        padding-bottom: 10px;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                    }
                    .footer {
                        margin-top: 60px;
                        text-align: center;
                        color: #666;
                        border-top: 1px solid #ccc;
                        padding-top: 20px;
                    }
                    @media print {
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${guide.title}</h1>
                    <p>Martin Harris Historical Association</p>
                    <p>${new Date().toLocaleDateString()}</p>
                </div>

                <div class="content">
                    <h2>Introduction</h2>
                    <p>${guide.content}</p>

                    <h2>Primary Sources</h2>
                    <p>Relevant primary source documents and excerpts...</p>

                    <h2>Discussion Questions</h2>
                    <ol>
                        <li>What factors influenced Martin Harris's religious journey?</li>
                        <li>How did cultural context shape restoration movements?</li>
                        <li>What can we learn from diverse perspectives?</li>
                    </ol>

                    <h2>Further Reading</h2>
                    <p>Recommended sources for deeper study...</p>
                </div>

                <div class="footer">
                    <p>&copy; ${new Date().getFullYear()} Martin Harris Historical Association</p>
                    <p>For educational use</p>
                </div>

                <div class="no-print" style="position: fixed; top: 20px; right: 20px;">
                    <button onclick="window.print()" style="padding: 10px 20px; font-size: 16px; cursor: pointer;">
                        Print/Save as PDF
                    </button>
                </div>
            </body>
            </html>
        `);
    }
}

// Initialize Resource Hub when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.resourceHub = new ResourceHub();
});
