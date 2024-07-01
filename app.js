const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo para el saludo inicial
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('Hola, en este momento no estoy disponible. Por favor comunícate con la compañía 🚗.')
    .addAnswer('1. Swiss Medical\n2. Meridional\n3. Zurich\n4. San Cristobal\n5. Mercantil Andina\n6. Libra\n7. Sura\n8. Sancor.');

// Flujo para compañías aseguradoras
const flowCompania = addKeyword(['compañía', 'compañías', 'aseguradora', 'aseguradoras'])
    .addAnswer('Por favor selecciona la compañía de seguros a la que estás afiliado: 🚗')
    .addAnswer('1. Swiss Medical\n2. Meridional\n3. Zurich\n4. San Cristobal\n5. Mercantil Andina\n6. Libra\n7. Sura\n8. Sancor')
    .addAnswer('Escribe el número de la compañía para obtener el número de teléfono correspondiente. 🚗');

// Flujos para cada compañía aseguradora
const flowCompaniaA = addKeyword(['1', 'swiss', 'Swiss', 'swiss medical', 'Swiss medical', 'Swiss Medical'])
    .addAnswer('El número de teléfono de Swiss Medical, atención al cliente es: 0800-222-7854. Atención de lunes a viernes de 9-18hs. Siniestros: 0810-333-3764. Atención 24 Hs. GRUA: 0810-333-764.');

const flowCompaniaB = addKeyword(['2', 'meridional', 'Meridional'])
    .addAnswer('El número de teléfono de Meridional, atención al cliente es: 0800-333-3244. Atención GRUA: 0810-333-4358.');

const flowCompaniaC = addKeyword(['3', 'Zurich', 'zurich'])
    .addAnswer('El número de teléfono de Zurich, atención al cliente es: 0810-333-987424. Atención GRUA: 0800-222-1600.');

const flowCompaniaD = addKeyword(['4', 'san cristobal', 'San Cristobal'])
    .addAnswer('El número de teléfono de San Cristobal, atención al cliente de lunes a viernes de 9 a 16:30hs es: 0810-222-8887. Atención GRUA: 0810-222-8887.');

const flowCompaniaE = addKeyword(['5', 'mercantil', 'Mercantil', 'Mercantil Andina', 'mercantil andina'])
    .addAnswer('El número de teléfono de Mercantil Andina, atención al cliente de lunes a viernes de 8 a 20hs, es: 0810-888-6262. Atención GRUA: 0800-777-2634. Urgencias: 0800-888-4488.');

const flowCompaniaF = addKeyword(['6', 'libra', 'Libra'])
    .addAnswer('El número de teléfono de Libra, atención al cliente es: 0800-888-5427 / 0810-220-1001. Atención GRUA: 0800-1226883. Siniestro: 0800-888-5427.');

const flowCompaniaG = addKeyword(['7', 'sura', 'Sura'])
    .addAnswer('El número de teléfono de Sura, atención al cliente es: 0800-2222772 / 5491128080330.');

const flowCompaniaH = addKeyword(['8', 'sancor', 'Sancor'])
    .addAnswer('El número de teléfono de Sancor, de lunes a viernes de 8 a 20hs, atención al cliente es: 0800-444-2850. Atención GRUA: 0800-333-2766. Siniestro: 0800-777-4643.');

// Crear el flujo principal que incluye todos los sub-flujos
const flowAll = createFlow([
    flowPrincipal, flowCompania,
    flowCompaniaA, flowCompaniaB, flowCompaniaC,
    flowCompaniaD, flowCompaniaE, flowCompaniaF,
    flowCompaniaG, flowCompaniaH
]);

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = flowAll;
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
}

main();



