import * as alt from "alt-client";
import * as game from "natives";
import Raycast from "./includes/raycast.js";
import { vehicles as VehicleList } from "./includes/vehicles.js";

let targetEntity = null; // Variable, um das aktuelle Ziel zu speichern

alt.everyTick(() => {
// Raycast ausführen
const raycastResult = Raycast.line(10, 4, alt.Player.local.scriptID); // Flag 4 für Peds (Spieler)

if (raycastResult.isHit && raycastResult.entityType === 1) { // EntityType 1 = Ped (Spieler)
targetEntity = raycastResult.hitEntity;

// Position des Ziels abrufen
const targetPos = game.getEntityCoords(targetEntity, false);

// Benutzerdefinierten weißen 2D-Kreis zeichnen
drawCircle(targetPos, 0.5, 5, [255, 255, 255, 255]); // Radius: 0.5m, Linienstärke: 5, Farbe: Weiß
} else {
targetEntity = null; // Kein Ziel im Fokus
}
});

function drawCircle(position, radius, thickness, color) {
const numSegments = 36; // Anzahl der Segmente für den Kreis (je höher, desto glatter)
const step = (Math.PI * 2) / numSegments; // Winkel zwischen den Segmenten

// Zeichne eine dicke Linie, indem wir zwei Kreise übereinander zeichnen
for (let t = 0; t < thickness; t++) {
for (let i = 0; i < numSegments; i++) {
const angle1 = step * i;
const angle2 = step * (i + 1);

const x1 = position.x + Math.cos(angle1) * (radius + t * 0.01); // Dünne Schritte für die Linienstärke
const y1 = position.y + Math.sin(angle1) * (radius + t * 0.01);

const x2 = position.x + Math.cos(angle2) * (radius + t * 0.01);
const y2 = position.y + Math.sin(angle2) * (radius + t * 0.01);

game.drawLine(
x1,
y1,
position.z - 0.95, // Höhe des Kreises (leicht über dem Boden)
x2,
y2,
position.z - 0.95, // Höhe des Kreises
color[0],
color[1],
color[2],
color[3]
);
}
}
}