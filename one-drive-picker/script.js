
      const baseUrl = "https://onedrive.live.com/picker";

      // the options we pass to the picker page through the querystring
      const params = {
        sdk: "8.0",
        entry: {
          oneDrive: {
            files: {},
          },
        },
        authentication: {},
        messaging: {
          origin:  "https://one-drive-picker-by-dheeraj.netlify.app",
          channelId: "27",
        },
        typesAndSources: {
          mode: "files",
          pivots: {
            oneDrive: true,
            recent: true,
          },
        },
      };

      let win = null;
      let port = null;

      async function launchPicker(e) {
        e.preventDefault();

        win = window.open("", "Picker", "width=800,height=600");

        const authToken = await getToken();

        const queryString = new URLSearchParams({
          filePicker: JSON.stringify(params),
        });

        const url = `${baseUrl}?${queryString}`;

        const form = win.document.createElement("form");
        form.setAttribute("action", url);
        form.setAttribute("method", "POST");
        win.document.body.append(form);

        const input = win.document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", "access_token");
        input.setAttribute("value", authToken);
        form.appendChild(input);

        form.submit();

        window.addEventListener("message", (event) => {
          if (event.source && event.source === win) {
            const message = event.data;

            if (
              message.type === "initialize" &&
              message.channelId === params.messaging.channelId
            ) {
              port = event.ports[0];

              port.addEventListener("message", messageListener);

              port.start();

              port.postMessage({
                type: "activate",
              });
            }
          }
        });
      }

      async function messageListener(message) {
        switch (message.data.type) {
          case "notification":
            console.log(`notification: ${JSON.stringify(message.data)}`);
            break;

          case "command":
            port.postMessage({
              type: "acknowledge",
              id: message.data.id,
            });

            const command = message.data.data;

            switch (command.command) {
              case "authenticate":
                // getToken is from scripts/auth.js
                const token = await getToken();

                if (typeof token !== "undefined" && token !== null) {
                  port.postMessage({
                    type: "result",
                    id: message.data.id,
                    data: {
                      result: "token",
                      token,
                    },
                  });
                } else {
                  console.error(
                    `Could not get auth token for command: ${JSON.stringify(
                      command
                    )}`
                  );
                }

                break;

              case "close":
                win.close();
                break;

              case "pick":
                let data = JSON.stringify(command);
                data = data.split(`"`);
                // console.log(data);
                // console.log(data[21]);

                console.log(`Picked: ${JSON.stringify(command)}`);

                // document.getElementById("pickedFiles").innerHTML = `<pre>${JSON.stringify(command, null, 2)}</pre>`;

                document.getElementById(
                  "pickedFiles"
                ).innerHTML = `<a href="${data[21]}" target="_blank">${data[13]}</a>`;

                port.postMessage({
                  type: "result",
                  id: message.data.id,
                  data: {
                    result: "success",
                  },
                });

                win.close();

                break;

              default:
                console.warn(
                  `Unsupported command: ${JSON.stringify(command)}`,
                  2
                );

                port.postMessage({
                  result: "error",
                  error: {
                    code: "unsupportedCommand",
                    message: command.command,
                  },
                  isExpected: true,
                });
                break;
            }

            break;
        }
      }
    