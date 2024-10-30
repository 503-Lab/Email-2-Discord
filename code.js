function EmailToDiscord() {
    // 未読のメールを検索
    const threads = GmailApp.search(`is:unread to:${EmailAddress}`);

    if (threads.length > 0) {
        for (let i = 0; i < threads.length; i++) {
            const messages = threads[i].getMessages();
            for (let j = 0; j < messages.length; j++) {
                const message = messages[j];
                const subject = message.getSubject();
                const from = message.getFrom();

                // Discordに送信するメッセージの内容
                const payload = {
                    content: `### 新しいメールが届きました\n${from}\n\`\`\`${subject}\`\`\``
                };

                // Discord WebhookにPOSTリクエストを送信
                sendDiscord(payload);

                // メールを既読にする
                message.markRead();
            }
        }
    }
}