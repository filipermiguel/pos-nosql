const Redis = require('ioredis');
const client = new Redis();

main();

async function main() {
    console.log('Generating numbers...');
    for (let number = 1; number <= 99; number++) {
        await client.sadd('numbers', number);
    }

    let numbersGenerated = await client.smembers('numbers');
    console.log(numbersGenerated);
    console.log('Finished generating numbers.');

    console.log('Generating players...');
    for (let user = 1; user <= 50; user++) {
        await client.hset('user:' + user, 'name', 'user:' + user);
        await client.hset('user:' + user, 'bcartela', 'cartela:' + user);
        await client.hset('user:' + user, 'bscore', 'score:' + user);

        var userGenerated = await client.hgetall('user:' + user);
        console.log(userGenerated);
    }
    console.log('Finished generating players.');

    console.log('Generating user card...');
    for (let userCard = 1; userCard <= 50; userCard++) {
        var setGeneratedNumbers = new Set();

        for (let generatedNumber = 1; generatedNumber <= 15; generatedNumber++) {
            var randomNumber = await client.srandmember('numbers');
            while (setGeneratedNumbers.has(randomNumber)) {
                randomNumber = await client.srandmember('numbers');
            }
            setGeneratedNumbers.add(randomNumber);

            await client.sadd('cartela:' + userCard, randomNumber);
        }

        const userCardInfo = await client.smembers('cartela:' + userCard);
        console.log('cartela:' + userCard, userCardInfo);
    }
    console.log('Finished generating user cards.');

    console.log('Generating scores...');
    for (let score = 1; score <= 50; score++) {
        await client.zadd('scoreRank', 0, 'score:' + score);
        console.log('Generated score:' + score + ' with value ' + 0);
    }
    console.log('Finished generating scores.');

    var finished = false;

    while (!finished) {

        console.log('Game started.');

        const drawnNumber = await client.srandmember('numbers');

        console.log('Drawn number:' + drawnNumber);

        for (let user = 1; user <= 50; user++) {
            if (await client.sismember('cartela:' + user, drawnNumber)) {
                console.log('User' + user + ' hits de number.');

                await client.zincrby('scoreRank', 1, 'score:' + user);
            }
        }

        var highestScore = await client.zrevrange('scoreRank', 0, 0, 'withscores');
        console.log(highestScore);
        if (highestScore[1] == 15) {
            finished = true;

            console.log(highestScore[0].split());
            
            var userNumber = highestScore[0].split(':')[1];
            
            console.log('User:' + userNumber + ' wins!');
        }
    }
}

