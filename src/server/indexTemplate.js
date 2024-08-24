export function indexTemplate (content, token) {
return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    // <script src="/static/client.js" type="application/javascript"></script>
    <script>
    window.__token__ = '${token}';
    </script>
    <title>My App</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div id="root">${content}</div>
    <script src="./bundle.js"></script>
</body>
</html>`;
};

