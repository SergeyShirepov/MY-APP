
export const indexTemplate = (content: string) => {
    return (`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My App</title>
      <script src="/static/vendors-node_modules_style-loader_dist_runtime_injectStylesIntoStyleTag_js-node_modules_style-1856be.bundle.js"></script>
            <script src="/static/main.bundle.js"></script> <!-- Обратите внимание на путь -->
      <script>
        window.__token__ = '';
      </script>
  </head>
  <body>
      <div id="react_root">${content}</div>
  </body>
  </html>`);
  };