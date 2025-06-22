import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "./app/app.config";
import { AppComponent } from "./app/app.component";
import { msalInstance } from "./app/msal.config";

async function main() {
  await msalInstance.initialize();
  await bootstrapApplication(AppComponent, appConfig);
}

main().catch((err) => console.error(err));
