function EmailToDiscord() {
    // 未読のメールを検索
    const threads = GmailApp.search(`is:unread to:${EmailAddress}`);

    threads.forEach(thread => {
        const messages = thread.getMessages();
        messages.forEach(message => {

            const from = message.getFrom();
            const subject = message.getSubject();

            // Discordに送信するメッセージの内容
            const payload = {
                content: `### 新しいメールが届きました\n${from}\n\`\`\`${subject}\`\`\``
            };

            // Discord WebhookにPOSTリクエストを送信
            sendDiscord(payload);

            // メールを既読にする
            message.markRead();
        });
    });
}