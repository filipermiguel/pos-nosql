## MongoDB

## Exercício 1 - Aquecendo com os pets 
Insira os seguintes registros no MongoDB e em seguida responda as questões abaixo: 

```
use petshop 
db.pets.insert({name: "Mike", species: "Hamster"}) 
db.pets.insert({name: "Dolly", species: "Peixe"}) 
db.pets.insert({name: "Kilha", species: "Gato"}) 
db.pets.insert({name: "Mike", species: "Cachorro"}) 
db.pets.insert({name: "Sally", species: "Cachorro"}) 
db.pets.insert({name: "Chuck", species: "Gato"}) 
```

1. Adicione outro Peixe e um Hamster com nome Frodo
```
db.pets.insert({name: "Nemo", species: "Peixe"}) 
db.pets.insert({name: "Frodo", species: "Hamster"}) 
```

2. Faça uma contagem dos pets na coleção
```
db.pets.find({}).count()
8
```

3. Retorne apenas um elemento o método prático possível 
```
db.pets.findOne()
{
        "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffca"),
        "name" : "Mike",
        "species" : "Hamster"
}
```

4. Identifique o ID para o Gato Kilha. 
```
db.pets.find({species:'Gato',name:'Kilha'},{'_id':1})
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffcc") }
```

5. Faça uma busca pelo ID e traga o Hamster Mike 
```
db.pets.find()
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffca"), "name" : "Mike", "species" : "Hamster" }
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffcb"), "name" : "Dolly", "species" : "Peixe" }
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffcc"), "name" : "Kilha", "species" : "Gato" }
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffcd"), "name" : "Mike", "species" : "Cachorro" }
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffce"), "name" : "Sally", "species" : "Cachorro" }
{ "_id" : ObjectId("5ea5feba4919f91ae2b5ffcf"), "name" : "Chuck", "species" : "Gato" }
{ "_id" : ObjectId("5ea5fed64919f91ae2b5ffd0"), "name" : "Fishy", "species" : "Peixe" }
{ "_id" : ObjectId("5ea5fef54919f91ae2b5ffd1"), "name" : "Frodo", "species" : "Hamster" }

db.pets.find({'_id':ObjectId('5ea5fe9b4919f91ae2b5ffca')})
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffca"), "name" : "Mike", "species" : "Hamster" }
```

6. Use o find para trazer todos os Hamsters 
```
db.pets.find({'species':'Hamster'})
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffca"), "name" : "Mike", "species" : "Hamster" }
{ "_id" : ObjectId("5ea5fef54919f91ae2b5ffd1"), "name" : "Frodo", "species" : "Hamster" }
```

7. Use o find para listar todos os pets com nome Mike 
```
db.pets.find({'name':'Mike'})
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffca"), "name" : "Mike", "species" : "Hamster" }
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffcd"), "name" : "Mike", "species" : "Cachorro" }
```

8. Liste apenas o documento que é um Cachorro chamado Mike 
```
db.pets.find({'species':'Cachorro','name':'Mike'})
{ "_id" : ObjectId("5ea5fe9b4919f91ae2b5ffcd"), "name" : "Mike", "species" : "Cachorro" }
```

## Exercício 2 – Mama mia!
Importe o arquivo dos italian-people.js do seguinte endereço: Downloads NoSQL FURB. Em seguida, importe o mesmo com o seguinte comando: 

mongo italian-people.js

Analise um pouco a estrutura dos dados e em seguida responda: 

1 Liste/Conte todas as pessoas que tem exatamente 99 anos. Você pode usar um count para indicar a quantidade. 
```
db.italians.find({'age':99}).count();
0
```

2. Identifique quantas pessoas são elegíveis atendimento prioritário (pessoas com mais de 65 anos) 
```
db.italians.find({'age':{$gt:65}}).count()
1805
```

3. Identifique todos os jovens (pessoas entre 12 a 18 anos). 
```
db.italians.find({$and:[{'age':{$gte:12}},{'age':{$lte:18}}]}).count()
892
```

4. Identifique quantas pessoas tem gatos, quantas tem cachorro e quantas não tem nenhum dos dois 
```
db.italians.find({'cat':{$exists:true}}).count()
5997
db.italians.find({'dog':{$exists:true}}).count()
3921
db.italians.find({'dog':{$exists:false},'cat':{$exists:false}}).count()
2478
```

5. Liste/Conte todas as pessoas acima de 60 anos que tenham gato 
```
db.italians.find({'age':{$gt:60},'cat':{$exists:true}}).count()
1461
```

6. Liste/Conte todos os jovens com cachorro 
```
db.italians.find({$and:[{'age':{$gte:12}},{'age':{$lte:18}},{'dog':{$exists:true}}]}).count()
365
```

7. Utilizando o $where, liste todas as pessoas que tem gato e cachorro 
```
db.italians.find(
...  {
...     $where: function() {
...         return (this.cat && this.dog)
...     }
...  }
... );
```

8. Liste todas as pessoas mais novas que seus respectivos gatos. 
```
db.italians.find({$expr: { $lt: [ "$age" , "$cat.age" ] }})
```

9. Liste as pessoas que tem o mesmo nome que seu bichano (gatou ou cachorro) 
```
db.italians.find(
... {
...     $where: function() {
...            return (
...             (  this.cat && this.cat.name === this.firstname ) ||
...             (  this.dog && this.dog.name === this.firstname ))
...        }
... }
... )
```

10. Projete apenas o nome e sobrenome das pessoas com tipo de sangue de fator RH negativo 
```
db.italians.find(
... { $or : [
...         { 'bloodType' :  {$eq :'A-'}},
...         { 'bloodType' :  {$eq :'B-'}},
...         { 'bloodType' :  {$eq :'AB-'}},
...         { 'bloodType' :  {$eq :'O-'}},
...     ]
... }
... )
```

11. Projete apenas os animais dos italianos. Devem ser listados os animais com nome e idade. Não mostre o identificado do mongo (ObjectId) 
```
db.italians.find({},{'cat.name':1,'cat.age':1,'dog.name':1,'dog.name':1,'_id':0})
```

12. Quais são as 5 pessoas mais velhas com sobrenome Rossi? 
```
db.italians.find({'surname':'Rossi'}).sort({'age':-1}).limit(5)
{ "_id" : ObjectId("5ea6064961126dcc6189e176"), "firstname" : "Pasquale", "surname" : "Rossi", "username" : "user2826", "age" : 79, "email" : "Pasquale.Rossi@yahoo.com", "bloodType" : "B-", "id_num" : "801783245828", "registerDate" : ISODate("2017-08-27T09:54:33.245Z"), "ticketNumber" : 54, "jobs" : [ "Negócios Imobiliários" ], "favFruits" : [ "Mamão", "Laranja", "Mamão" ], "movies" : [ { "title" : "Cidade de Deus (2002)", "rating" : 0.63 }, { "title" : "O Poderoso Chefão II (1974)", "rating" : 2.95 }, { "title" : "Coringa (2019)", "rating" : 0.04 }, { "title" : "Harakiri (1962)", "rating" : 4.56 } ], "cat" : { "name" : "Barbara", "age" : 2 } }
{ "_id" : ObjectId("5ea6065261126dcc6189f8a6"), "firstname" : "Cinzia", "surname" : "Rossi", "username" : "user8762", "age" : 78, "email" : "Cinzia.Rossi@hotmail.com", "bloodType" : "B+", "id_num" : "335486381122", "registerDate" : ISODate("2008-05-07T22:56:47.940Z"), "ticketNumber" : 4631, "jobs" : [ "Música", "Oceanografia" ], "favFruits" : [ "Tangerina", "Pêssego", "Goiaba" ], "movies" : [ { "title" : "A Origem (2010)", "rating" : 2.23 }, { "title" : "Um Sonho de Liberdade (1994)", "rating" : 3.58 }, { "title" : "Batman: O Cavaleiro das Trevas (2008)", "rating" : 2 } ] }
{ "_id" : ObjectId("5ea6064d61126dcc6189eb73"), "firstname" : "Sonia", "surname" : "Rossi", "username" : "user5383", "age" : 77, "email" : "Sonia.Rossi@hotmail.com", "bloodType" : "B+", "id_num" : "446086736570", "registerDate" : ISODate("2007-09-09T09:09:21.525Z"), "ticketNumber" : 5114, "jobs" : [ "Engenharia de Alimentos", "Computação" ], "favFruits" : [ "Tangerina", "Mamão" ], "movies" : [ { "title" : "O Poderoso Chefão II (1974)", "rating" : 0.35 }, { "title" : "Um Estranho no Ninho (1975)", "rating" : 3.52 }, { "title" : "Coringa (2019)", "rating" : 1.47 }, { "title" : "Forrest Gump: O Contador de Histórias (1994)", "rating" : 3.16 }, { "title" : "Os Bons Companheiros (1990)", "rating" : 2.78 } ], "cat" : { "name" : "Veronica", "age" : 7 } }
{ "_id" : ObjectId("5ea6064e61126dcc6189ee0a"), "firstname" : "Stefania", "surname" : "Rossi", "username" : "user6046", "age" : 77, "email" : "Stefania.Rossi@gmail.com", "bloodType" : "O+", "id_num" : "828656863156", "registerDate" : ISODate("2017-09-19T14:28:30.226Z"), "ticketNumber" : 8701, "jobs" : [ "Engenharia de Produção" ], "favFruits" : [ "Uva", "Goiaba" ], "movies" : [ { "title" : "O Senhor dos Anéis: O Retorno do Rei (2003)", "rating" : 1.57 }, { "title" : "1917 (2019)", "rating" : 1.13 }, { "title" : "Cidade de Deus (2002)", "rating" : 1.79 }, { "title" : "O Senhor dos Anéis: O Retorno do Rei (2003)", "rating" : 2.22 }, { "title" : "Cidade de Deus (2002)", "rating" : 4.94 } ], "father" : { "firstname" : "Pasquale", "surname" : "Rossi", "age" : 104 }, "dog" : { "name" : "Paolo", "age" : 1 } }
{ "_id" : ObjectId("5ea6064661126dcc6189d726"), "firstname" : "Claudia", "surname" : "Rossi", "username" : "user186", "age" : 75, "email" : "Claudia.Rossi@hotmail.com", "bloodType" : "AB-", "id_num" : "411735123217", "registerDate" : ISODate("2010-05-24T04:31:17.548Z"), "ticketNumber" : 5187, "jobs" : [ "Eletrotécnica Industrial", "Sistemas de Informação" ], "favFruits" : [ "Goiaba" ], "movies" : [ { "title" : "Um Sonho de Liberdade (1994)", "rating" : 0.64 }, { "title" : "12 Homens e uma Sentença (1957)", "rating" : 4.47 }, { "title" : "A Lista de Schindler (1993)", "rating" : 2.36 } ], "mother" : { "firstname" : "Salvatore", "surname" : "Rossi", "age" : 91 }, "cat" : { "name" : "Raffaele", "age" : 12 } }
```

13. Crie um italiano que tenha um leão como animal de estimação. Associe um nome e idade ao bichano 
```
db.italians.insert(
... {
...     "firstname" : "Nome",
...     "surname" : "Sobrenome",
...     "username" : "user666",
...     "age" : 25,
...     "email" : "nome.sobrenome@gmail.com.br",
...     "bloodType" : "B+",
...     "id_num" : "801783245829",
...     "registerDate" : ISODate("2020-04-26T19:54:16.645Z"),
...     "ticketNumber" : 6666,
...     "jobs" : [ "Programador" ],
...     "favFruits" : [ "Apple" ],
...     "movies" : [ { "title" : "Titanic", "rating" : 2.37 }],
...     "father" : { "firstname" : "John", "surname" : "Kennedy", "age" : 54 },
...     "lion" : { "name" : "Mozart", "age" : 12 },
... })
```

14. Infelizmente o Leão comeu o italiano. Remova essa pessoa usando o Id. 
```
db.italians.find({'surname':'Sobrenome'})
{ "_id" : ObjectId("5ea61176d2c9d765f464dd52"), "firstname" : "Nome", "surname" : "Sobrenome", "username" : "user666", "age" : 25, "email" : "nome.sobrenome@gmail.com.br", "bloodType" : "B+", "id_num" : "801783245829", "registerDate" : ISODate("2020-04-26T19:54:16.645Z"), "ticketNumber" : 6666, "jobs" : [ "Programador" ], "favFruits" : [ "Apple" ], "movies" : [ { "title" : "Titanic", "rating" : 2.37 } ], "father" : { "firstname" : "John", "surname" : "Kennedy", "age" : 54 }, "lion" : { "name" : "Mozart", "age" : 12 } }
{ "_id" : ObjectId("5ea6119dd2c9d765f464dd53"), "firstname" : "Nome", "surname" : "Sobrenome", "username" : "user666", "age" : 25, "email" : "nome.sobrenome@gmail.com.br", "bloodType" : "B+", "id_num" : "801783245829", "registerDate" : ISODate("2020-04-26T19:54:16.645Z"), "ticketNumber" : 6666, "jobs" : [ "Programador" ], "favFruits" : [ "Apple" ], "movies" : [ { "title" : "Titanic", "rating" : 2.37 } ], "father" : { "firstname" : "John", "surname" : "Kennedy", "age" : 54 }, "lion" : { "name" : "Mozart", "age" : 12 } }
db.italians.remove({'_id':ObjectId("5ea61176d2c9d765f464dd52")})
```

15. Passou um ano. Atualize a idade de todos os italianos e dos bichanos em 1. 
```
db.italians.update({},{ $inc: { 'age':1,  'cat.age':1 ,'dog.age':1 } }, { multi:true })
```

16. O Corona Vírus chegou na Itália e misteriosamente atingiu pessoas somente com gatos e de 66 anos. Remova esses italianos. 
```
db.italians.remove({'age':66, 'cat':{$exists:true}})
```

17. Utilizando o framework agregate, liste apenas as pessoas com nomes iguais a sua respectiva mãe e que tenha gato ou cachorro. 
```
db.italians.aggregate([
...    {
...       $match : {
...          $or: [
...             {"cat":{"$exists":true}},
...             {"dog":{"$exists":true}}
...             ]
...       }
...     },
...     {"$addFields": {
...         "nameEqMotherName": {"$eq":["$firstname","$mother.name"]}
...       }
...     }
... ])
```

18. Utilizando aggregate framework, faça uma lista de nomes única de nomes. Faça isso usando apenas o primeiro nome 
```
db.italians.aggregate(
... [
... 	{ "$group": {
... 		"_id": {"firstname": "$firstname"}
... 	}}
... ]
...);
```

19. Agora faça a mesma lista do item acima, considerando nome completo. 
```
db.italians.aggregate(
... [
... 	{ "$group": {
... 		"_id": {"firstname": "$firstname", "surname": "$surname"}
... 	}}
... ]
...);
```

20. Procure pessoas que gosta de Banana ou Maçã, tenham cachorro ou gato, mais de 20 e  menos de 60 anos
```
db.italians.find(
...    {
...         $and: [
... {
...             'favFruits': {$in:["Maçã","Banana"]}
...             },
...             {
...              $or: [{cat: {$exists:true}},{dog: {$exists:true}}]
...             },
...             {
...                  'age' : { $gt:20 }
...             },
...             {
...                  'age' : { $lt:60 }
...             }
...         ]
...     }
... )
```

## Exercício 3 – Stockbrokers 
Importe o arquivo stocks.json do repositório Downloads NoSQL FURB. 
Esses dados são dados reais da bolsa americana de 2015. 

A importação do arquivo JSON é um pouco diferente da execução de um script:
```
mongoimport --db stocks --collection stocks --file stocks.json 
```

Analise um pouco a estrutura dos dados novamente e em seguida, responda as seguintes perguntas: 

1. Liste as ações com profit acima de 0.5 (limite a 10 o resultado)
```

db.stocks.find({'Profit Margin':{$gt:0.5}}).limit(10)
```

2. Liste as ações com perdas (limite a 10 novamente) 
```
db.stocks.find({'Profit Margin':{$lt:0}}).limit(10)
```

3. Liste as 10 ações mais rentáveis  
```
db.stocks.find({}).sort({'Profit Margin':-1}).limit(10)
```

4. Qual foi o setor mais rentável? 
```
db.stocks.aggregate(
...    [ 
...		{
...			$group:
...			{
...				_id: { sector: "$Sector" },
...				totalAmount: { $sum: "$Profit Margin" }
...			}
...		},
...		{
...			$sort:{ totalAmount:-1 }
...		},
...		{
...			$limit: 1
...		}
...    ]
...)
```

5. Ordene as ações pelo profit e usando um cursor, liste as ações. 
```
var cursor = db.stocks.find({}).sort({'Profit Margin':-1});
while (cursor.hasNext()) {
   var atual = cursor.next();
   printjson(atual);
}
```

6. Renomeie o campo “Profit Margin” para apenas “profit”. 
```
db.stocks.updateMany({}, {$rename:{"Profit Margin": "profit"}})
```

7. Agora liste apenas a empresa e seu respectivo resultado 
```
db.stocks.find({},{'Company':1,'profit':1})
```

8. Analise as ações. É uma bola de cristal na sua mão... Quais as três ações você investiria? 
```
db.stocks.find({}).sort({'20-Day Simple Moving Average':-1}).limit(3)
```

9. Liste as ações agrupadas por setor
```
db.stocks.aggregate([
   {$group : {_id : "$Sector"}}
])
```

## Exercício 3 – Fraude na Enron! 

Um dos casos mais emblemáticos de fraude no mundo é o caso da Enron. A comunicade do MongoDB utiliza muito esse dataset pois o mesmo se tornou público, então vamos importar esse material também: 
```
mongoimport --db stocks --collection eron --file enron.json 
```

1. Liste as pessoas que enviaram e-mails (de forma distinta, ou seja, sem repetir). Quantas pessoas são? 
```
db.enron.distinct("sender")
```

2. Contabilize quantos e-mails tem a palavra “fraud” 
```
db.enron.find({text: {$regex: /fraud/i}}).count()
```