import { AppiumDriver, createDriver, SearchOptions } from "nativescript-dev-appium";
describe("Ejemplo", () => {
 let driver: AppiumDriver;
 // esto se ejecuta una sola vez, antes de todos los test, para inicializar el conector al dispositivo
 beforeAll(async () => driver = await createDriver());
 // esto se ejecuta una sola vez, luego de todos los test, para cerrar el conector al dispositivo
 afterAll(async () => await driver.quit());
 // esto se ejecuta antes de cada ‘it’, aquí a modo de prueba logueamos los artefactos del test
 afterEach(async function () { await driver.logTestArtifacts("report"); });
 it("se debe encontrar un elemento por typo", async () => {
 // ubicamos el label
 const label = await driver.findElementByText(" veces hecho tap", SearchOptions.contains);
 // verificamos que estaba en 0
 expect(await label.text()).toContain("0");
 // ubicamos y hacemos tap en el botón
 const boton = await
driver.findElementByClassName(driver.locators.button);
 await boton.click();
 // verificamos que el label cambió a 1
 expect(await label.text()).toContain("1");
 });
}); 