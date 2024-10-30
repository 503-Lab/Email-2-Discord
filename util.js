function sendDiscord(payload) {
    const options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(payload)
    };
    UrlFetchApp.fetch(WebhookURL, options);
}