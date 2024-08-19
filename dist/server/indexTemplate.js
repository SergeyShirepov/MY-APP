"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexTemplate = indexTemplate;
function indexTemplate(content) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My App</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <div id="root">${content}</div>
    <script src="./bundle.js"></script>
</body>
</html>`;
}
;
//# sourceMappingURL=indexTemplate.js.map