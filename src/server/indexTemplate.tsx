
export const indexTemplate = (content: string, token: any) => {
    return (`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>My App</title>
      <script>
        window.__token__ = '${token}';
      </script>
  </head>
  <body>
      <div id="react_root">${content}</div>
      <div id="modal_root"></div>
      <script src="/static/vendors.bundle.js"></script>
      <script src="/static/main.bundle.js"></script>
  </body>
  </html>`);
  };