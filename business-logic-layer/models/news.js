/**
 * Basic class for each news, containing:
 * - title of the news
 * - url linking to the complete news
 * - date in which the news was published
 * - source of the news
 * - sentiment, from -1 (negative) to 1 (positive)
 */
 class News {
    sentiment;
    constructor(title, content, publishedAt, source) {
        this.title = title;
        this.content = content;
        this.publishedAt = new Date(publishedAt);
        this.source = source;
    }

    static from(json) {
        return Object.assign(new News(), json);
    }
}

module.exports = News;