const redis = require('redis');

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

exports.lambdaHandler = async () => {
    return new Promise((resolve, reject) => {
        // Inserir dados no Redis
        client.set('tipoDeRelatorio', 'Relatorio Mensal', (err, res) => {
            if (err) {
                console.error(`Erro ao inserir tipoDeRelatorio: ${err}`);
                reject(err);
            }
            console.log(`Inserido tipoDeRelatorio: ${res}`);

            client.set('parametros', 'param1,param2,param3', (err, res) => {
                if (err) {
                    console.error(`Erro ao inserir parametros: ${err}`);
                    reject(err);
                }
                console.log(`Inserido parametros: ${res}`);

                // Ler dados do Redis
                client.get('tipoDeRelatorio', (err, tipoDeRelatorio) => {
                    if (err) {
                        console.error(`Erro ao ler tipoDeRelatorio: ${err}`);
                        reject(err);
                    }
                    console.log(`Lido tipoDeRelatorio: ${tipoDeRelatorio}`);

                    client.get('parametros', (err, parametros) => {
                        if (err) {
                            console.error(`Erro ao ler parametros: ${err}`);
                            reject(err);
                        }
                        console.log(`Lido parametros: ${parametros}`);

                        resolve({
                            statusCode: 200,
                            body: JSON.stringify({
                                message: 'Dados do Redis',
                                tipoDeRelatorio: tipoDeRelatorio,
                                parametros: parametros
                            })
                        });
                    });
                });
            });
        });
    });
};
