export const ZOND_WALLET_PROVIDER_NAME = "zond-wallet-provider";

export const EXTENSION_MESSAGES = {
  CONNECTION_READY: "ZOND_WALLET_CONNECTION_READY",
  READY: "ZOND_WALLET_EXTENSION_READY",
  UNRESTRICTED_METHOD_CALLS: "ZOND_UNRESTRICTED_METHOD_CALLS",
  DAPP_RESPONSE: "ZOND_WALLET_DAPP_RESPONSE",
} as const;

export const ZOND_POST_MESSAGE_STREAM = {
  INPAGE: "zond-wallet-in-page",
  CONTENT_SCRIPT: "zond-wallet-content-script",
} as const;

export const ZOND_WEB3_WALLET_PROVIDER_INFO = {
  NAME: "ZondWeb3Wallet",
  RDNS: "theqrl.org",
  ICON: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzUiIGhlaWdodD0iMzMiIHZpZXdCb3g9IjAgMCAzNSAzMyIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0LjI0OTUgMjIuNzM4MUMyNi4yMjA5IDIyLjczODEgMjcuMTI0IDIxLjk4ODggMjcuNTM3NSAyMS4yNzE5QzI4LjMzMzQgMTkuODkzMiAyNy43NzQ2IDE4LjA5ODIgMjUuODczNyAxNS45MzkyQzI0LjgyMSAxNC43NDM5IDIzLjIzMzUgMTMuMTgwNCAyMi4xNTU0IDEyLjQwMjhDMjIuMDg2MiAxMS43MzI1IDIxLjk5MzEgMTEuMDc2MyAyMS44Nzc0IDEwLjQ0NDJDMjIuMTg1IDEwLjM2OCAyMi40ODcgMTAuMzAzIDIyLjc3NzcgMTAuMjUwOEMyNC41NzU1IDkuOTMzMzIgMjUuNjE0MSAxMC4xOTQ0IDI1Ljg0NDEgMTAuNTkzN0MyNS45OTkzIDEwLjg2MzMgMjUuODgwOCAxMS40MjIxIDI1LjUxODEgMTIuMTI3N0MyNS4yMDc3IDEyLjczMyAyNC45MjY5IDEzLjA2ODkgMjQuODM4IDEzLjE2NzdDMjUuMzk4MiAxMy42Njg2IDI1LjkwNDggMTQuMTkyMiAyNi4yMzA4IDE0LjU0MjFDMjYuMzk1OSAxNC4zNjcxIDI2LjgxNjQgMTMuODgwMyAyNy4yNTgxIDEzLjAyMjNDMjcuOTYwOCAxMS42NTYzIDI4LjA1NTQgMTAuNTEwNSAyNy41Mzg5IDkuNjE1ODFDMjcuMDE1NCA4LjcwODQ0IDI1LjcwNTggNy43NDg4NiAyMi40MzkgOC4zMjQ2QzIyLjExMyA4LjM4MjQ2IDIxLjc3NzIgOC40NTQ0MyAyMS40MzU3IDguNTM5MUMyMC42MzU2IDUuNzU3NzIgMTkuMjk2NCAzLjc4OTE3IDE3LjQ0NjQgMy43ODkxN0MxNi4zNzExIDMuNzg5MTcgMTQuODQ5OCA0LjQ3NjQgMTMuNzA1NCA3Ljc2NTc5QzEzLjY5NDEgNy44MDI0OCAxMy40MTMzIDguNjY0NjkgMTMuMTk0NiA5LjYzNjk3QzEyLjk3MTYgMTAuNjI2MiAxMi43NjQyIDExLjY4ODggMTIuNTc2NSAxMi43OTk0QzExLjk4MzggMTMuMjI0MSAxMS40MjUgMTMuNjYwMiAxMC45MDU3IDE0LjEwMzNDOS4zNjYxMiAxMi41MTE1IDguNzE4NCAxMS4xNjI0IDkuMDQ1NzkgMTAuNTk1MUM5LjI0MzM1IDEwLjI1MzYgOS44NjI4NCA5Ljk3MDAxIDEwLjgwMTMgMTAuMTA1NUMxMS4zNDE3IDEwLjE4MzEgMTEuNzA0NCAxMC4yNjkyIDExLjg1OTYgMTAuMzEwMUMxMi4wMDM2IDkuNTcyMDYgMTIuMTk0MSA4Ljg2NzkgMTIuMzI2NyA4LjQxMDY5QzEyLjA5OTUgOC4zNTI4MyAxMS42ODA0IDguMjU2ODcgMTEuMDgwNyA4LjE2OTM4QzkuNDMyNDQgNy45MzIzMSA4LjAwNDM2IDguNDg2ODkgNy4zNTI0MSA5LjYxNzIyQzYuNDI2NjkgMTEuMjIwMyA3LjQ2MTA2IDEzLjM2NTIgOS40NzA1NCAxNS40NDgxQzkuMjI2NDEgMTUuNzAyMSA4Ljk5NDk4IDE1Ljk1NjEgOC43ODMzMSAxNi4yMTAxQzYuNjUyNDggMTguNzUxNiA2LjgyODg3IDIwLjM2NTkgNy4zNTI0MSAyMS4yNzE5QzcuOTMyMzkgMjIuMjc1MiA5LjEzMTg3IDIyLjc5MDMgMTAuNzI5MyAyMi43OTAzQzExLjgwODggMjIuNzkwMyAxMy4wNzE4IDIyLjU1NDYgMTQuNDQ0OCAyMi4wNzQ4QzE1LjEwMzkgMjEuODQ0OCAxNi42NzU5IDIxLjIwOTggMTcuNDE4MSAyMC45MDY0QzE4LjE0MDYgMjEuMjM5NCAxOC44NTYxIDIxLjUzMTYgMTkuNTU0NiAyMS43Nzk5QzE4Ljk0MzYgMjMuOTA2NSAxOC4wOTk3IDI1LjE0MjcgMTcuNDQ0OSAyNS4xNDI3QzE2LjkyNTYgMjUuMTQyNyAxNi4zMDA1IDI0LjM4MzUgMTUuODEwOCAyMy4xNkMxNS43OTExIDIzLjExMDYgMTUuNzU3MiAyMy4wMTE5IDE1LjcyMDUgMjIuOTAzMkMxNS4wNTczIDIzLjE2NDMgMTQuMzcyOSAyMy4zNzU5IDEzLjg2NDkgMjMuNTIxM0MxMy45MDg2IDIzLjY1MzkgMTMuOTU2NiAyMy43OTM2IDEzLjk5NDcgMjMuODg2OEMxNS4wNTczIDI2LjU0MTEgMTYuNDU3MSAyNy4wOTg1IDE3LjQ0NDkgMjcuMDk4NUMxOS4yOTY0IDI3LjA5ODUgMjAuNjM1NiAyNS4xMyAyMS40MzQzIDIyLjM0ODZDMjEuNzc3MiAyMi40MzMzIDIyLjExMTYgMjIuNTA1MiAyMi40Mzc2IDIyLjU2MzFDMjMuMTI0OCAyMi42ODQ1IDIzLjcyNDYgMjIuNzM4MSAyNC4yNDk1IDIyLjczODFaTTE1LjEwMSAxMC4wNjc0QzE1LjI5NzIgOS4xOTM4NyAxNS41NTY4IDguMzkyMzQgMTUuNTU2OCA4LjM5MjM0QzE2LjE5MzMgNi41NjQ5IDE2Ljk2MzcgNS43NDY0MyAxNy40NDQ5IDUuNzQ2NDNDMTguMDk5NyA1Ljc0NjQzIDE4Ljk0MzYgNi45ODI2IDE5LjU1NDYgOS4xMDkyQzE4LjA4MjggOS42MzEzMyAxNi41MzQ4IDEwLjM1MSAxNS4wMTIxIDExLjIzMDJDMTQuOTUxNCAxMS4yNjU0IDE0Ljg5MjIgMTEuMzAwNyAxNC44MzI5IDExLjMzNkMxNC45MTkgMTAuOTAxNCAxNS4wMDkzIDEwLjQ3OCAxNS4xMDEgMTAuMDY3NFpNMTMuNzk4NSAyMC4yMjkxQzExLjA3NzggMjEuMTc4OCA5LjM1NDgzIDIwLjgyODggOS4wNDU3OSAyMC4yOTRDOC44MTU3NyAxOS44OTQ2IDkuMTA3ODggMTguODY1OSAxMC4yODIgMTcuNDY2QzEwLjQ3MjUgMTcuMjM4OCAxMC42Nzk5IDE3LjAxMDIgMTAuOSAxNi43ODNDMTIuMTE2NCAxNy44MTc0IDEzLjUzMDQgMTguODAyNCAxNS4wMTIxIDE5LjY1OUMxNS4wNDg4IDE5LjY4MDEgMTUuMDg2OSAxOS43MDEzIDE1LjEyMzYgMTkuNzIyNUMxNC41OTU4IDE5LjkzMTMgMTQuMDkwNiAyMC4xMjc1IDEzLjc5ODUgMjAuMjI5MVpNMTUuOTkwMSAxNy45NjU2QzE0LjU2NzYgMTcuMTQ0MyAxMy4zNTEyIDE2LjI4MDcgMTIuMzQ3OSAxNS40NDI0QzEzLjQwNDggMTQuNTYxOSAxNC42NDEgMTMuNzAzOSAxNS45OTAxIDEyLjkyNUMxNy4zMzkxIDEyLjE0NiAxOC42OTk1IDExLjUwMzkgMTkuOTkwNyAxMS4wMjk4QzIwLjIxNjQgMTIuMzE4MiAyMC4zNTQ3IDEzLjgwNDEgMjAuMzU0NyAxNS40NDUzQzIwLjM1NDcgMTcuMDg2NCAyMC4yMTY0IDE4LjU3MzggMTkuOTkwNyAxOS44NjA4QzE4LjY5OTUgMTkuMzg2NiAxNy4zMzkxIDE4Ljc0NDUgMTUuOTkwMSAxNy45NjU2Wk0yMi4zMDkyIDE1LjA4NEMyMi45OTY0IDE1LjcyMTkgMjMuNzU4NCAxNi40OTY2IDI0LjQwNjEgMTcuMjMxOEMyNS44MzQyIDE4Ljg1MzIgMjYuMDg1NCAxOS44Nzc3IDI1Ljg0NDEgMjAuMjk0QzI1LjYxNDEgMjAuNjkzMyAyNC41NzU1IDIwLjk1MyAyMi43Nzc3IDIwLjYzNjlDMjIuNDg1NiAyMC41ODYxIDIyLjE4NSAyMC41MTk4IDIxLjg3NzQgMjAuNDQzNkMyMi4xNjUyIDE4Ljg3MjkgMjIuMzEyIDE3LjE1NTYgMjIuMzEyIDE1LjQ0MzlDMjIuMzEwNiAxNS4zMjUzIDIyLjMxMDYgMTUuMjA0IDIyLjMwOTIgMTUuMDg0WiIgZmlsbD0iI0ZGQTcyOSIvPgo8cGF0aCBkPSJNMTcuNDQ1IDEzLjUxMDZDMTYuMzc4MSAxMy41MTA2IDE1LjUxMDMgMTQuMzc4NCAxNS41MTAzIDE1LjQ0NTNDMTUuNTEwMyAxNi41MTIxIDE2LjM3ODEgMTcuMzggMTcuNDQ1IDE3LjM4QzE4LjUxMTggMTcuMzggMTkuMzc5NiAxNi41MTIxIDE5LjM3OTYgMTUuNDQ1M0MxOS4zNzk2IDE0LjM3ODQgMTguNTExOCAxMy41MTA2IDE3LjQ0NSAxMy41MTA2WiIgZmlsbD0iI0ZGQTcyOSIvPgo8cGF0aCBkPSJNMzIuODkgMTUuNDQ1M0MzMi44OSA2Ljg5OTM0IDI1LjkxMzMgLTAuMDQ2MzM1MSAxNy4zNTc1IDAuMDAwMjMyODA0QzkuMzQwNzIgMC4wNDM5Nzg0IDIuNTU1OTEgNi40MDU0NCAyLjAzMzc5IDE0LjQwNjdDMS42NjEyNCAyMC4xMzAzIDQuMzkwNDEgMjUuNDYwMiA5LjE4NTQ5IDI4LjQ5OThMOS4xNzk4NSAzMC43MzIyTDMuOTY0MjQgMzAuNzQ5MlYyNy4xOTczSDIuMDA5OFYzMi42ODgxSDExLjEzNzFMMTEuMTQyOCAyOC40NjQ1QzExLjE0NDIgMjcuODExMiAxMC44MDU1IDI3LjIwNzIgMTAuMjM2OCAyNi44NDc0QzYuMzA1MzQgMjQuMzYyMyAzLjk1NzE4IDIwLjEwMDYgMy45NTcxOCAxNS40NDUzQzMuOTU3MTggOC4wMzM5MSA5Ljk2NTg2IDEuOTk5ODMgMTcuMzY3MyAxLjk1NjA5QzI0LjYxOTIgMS45MTM3NSAzMC42ODcyIDcuNzM2MTUgMzAuOTI3MSAxNC45ODM4QzMxLjA4NzkgMTkuODE3IDI4LjcxNzIgMjQuMjgwNSAyNC42NTU5IDI2Ljg0NzRDMjQuMDg3MiAyNy4yMDcyIDIzLjc0ODYgMjcuODExMiAyMy43NSAyOC40NjQ1TDIzLjc1OTggMzIuNjg4MUgzMi44ODI5VjI3LjE5NzNIMzAuOTI3MUwzMC45NDQgMzAuNzMyMkwyNS43MTE1IDMwLjc0OTJMMjUuNzA1OCAyOC40OTg0QzMwLjIwMzIgMjUuNjUyMSAzMi44OSAyMC43NzM4IDMyLjg5IDE1LjQ0NTNaIiBmaWxsPSIjRkZBNzI5Ii8+Cjwvc3ZnPgo=",
} as const;
