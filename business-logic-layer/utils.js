function formatLabel(str, maxwidth) {
    var sections = [];
    var words = str.split(" ");
    var temp = "";

    words.forEach(function (item, index) {
        if (temp.length > 0) {
            var concat = temp + ' ' + item;
            if (concat.length > maxwidth - 3) {
                sections.push(temp);
                temp = "";
            }
            else {
                if (index == (words.length - 1)) {
                    sections.push(concat);
                    return;
                }
                else {
                    temp = concat;
                    return;
                }
            }
        }

        if (index == (words.length - 1)) {
            sections.push(item);
            return;
        }

        if (item.length < maxwidth) {
            temp = item;
        }
        else {
            sections.push(item);
        }

    });

    return sections;
}

function orderNewsByDate(news) {
    const ordered = news;
    ordered.sort(function (a, b) {
        return new Date(a.publishedAt) - new Date(b.publishedAt);
    });
    return ordered;
}


function generateAnnotationFromNews(news, isEven) {
    return {
        "type": "line",
        "borderColor": "black",
        "borderDash": [20, 10],
        "borderWidth": 2,
        "label": {
            "padding": 10,
            "position": "start",
            "font": {
                "size": 5
            },
            "yAdjust": isEven ? 45 : 0,
            "content": formatLabel(news.title, 30),
            "enabled": true
        },
        "scaleID": "x",
        "value": news.publishedAt
    };
}

function generateAnnotations(newsArray) {
    let isEven = true;
    let annotations = [];
    for (const news in newsArray) {
        if (Object.hasOwnProperty.call(newsArray, news)) {
            const element = newsArray[news];
            annotations.push(generateAnnotationFromNews(element, isEven));
            isEven = !isEven;
        }
    }
    return annotations;
}

function generateLabelsFromExchanges(exchanges) {
    let labels = [];
    for (const exchange in exchanges) {
        if (Object.hasOwnProperty.call(exchanges, exchange)) {
            labels.push(exchanges[exchange].date);
        }
    }
    return labels;
}

function generateDataFromExchanges(exchanges) {
    let data = [];
    for (const exchange in exchanges) {
        if (Object.hasOwnProperty.call(exchanges, exchange)) {
            const element = exchanges[exchange];
            data.push(element.price);
        }
    }
    return data;
}

module.exports = {
    formatLabel,
    generateAnnotationFromNews,
    generateAnnotations,
    generateDataFromExchanges,
    generateLabelsFromExchanges,
    orderNewsByDate
}