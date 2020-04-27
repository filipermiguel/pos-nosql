## HBase

## Aquecendo com alguns dados

Importe o arquivo italians.txt do repositório Downloads NoSQL FURB. Em seguida,
carregue o mesmo no hbase. Para isso, você precisa enviar o arquivo para a

imagem Docker primeiro.
docker cp italians.txt hbase-furb:/tmp

Agora, de dentro da imagem faça os sefuintes procedimentos:

1. Crie a tabela com 2 famílias de colunas:
	a. personal-data
	b. professional-data

```
hbase(main):001:0> create_namespace 'italians'
Took 0.8550 seconds
hbase(main):002:0> create 'italians','personal-data','professional-data'
Created table italians
Took 0.8134 seconds
=> Hbase::Table - italians
```

2.
```
hbase shell /tmp/italians.txt
```

Agora execute as seguintes operações:

1. Adicione mais 2 italianos mantendo adicionando informações como data
de nascimento nas informações pessoais e um atributo de anos de
experiência nas informações profissionais;
```
put 'italians', '11', 'personal-data:name',  'Joao Silva'
put 'italians', '11', 'personal-data:city',  'Blumenau'
put 'italians', '11', 'personal-data:birthdate',  '01-01-1990'
put 'italians', '11', 'professional-data:role',  'Comerciante'
put 'italians', '11', 'professional-data:salary',  '5000'
put 'italians', '11', 'professional-data:experienceyear',  '5'

put 'italians', '12', 'personal-data:name',  'Mara Silva'
put 'italians', '12', 'personal-data:city',  'Gaspar'
put 'italians', '12', 'personal-data:birthdate',  '01-01-1985'
put 'italians', '12', 'professional-data:role',  'Costureira'
put 'italians', '12', 'professional-data:salary',  '3000'
put 'italians', '12', 'professional-data:experienceyear',  '10'
```

2. Adicione o controle de 5 versões na tabela de dados pessoais.
```
alter 'italians', NAME => 'personal-data', VERSIONS => 5
```

3. Faça 5 alterações em um dos italianos;]
```
put 'italians', '12', 'personal-data:city',  'Mara Souza'
put 'italians', '12', 'personal-data:city',  'Gaspar'
put 'italians', '12', 'professional-data:role',  'Vendedora'
put 'italians', '12', 'professional-data:salary',  '3500'
put 'italians', '12', 'professional-data:experienceyear',  '9'
```

4. Com o operador get, verifique como o HBase armazenou o histórico.
```
get 'italians', '12',{COLUMN=>'personal-data:city',VERSIONS=>2}
```

5. Utilize o scan para mostrar apenas o nome e profissão dos italianos.
```
scan 'italians',{COLUMNS=>['personal-data:name','professional-data:role']}
```

6. Apague os italianos com row id ímpar
```
deleteall 'italians', ['1','3','5','7','9','11']
```

7. Crie um contador de idade 55 para o italiano de row id 5
```
put 'italians', '5', 'personal-data:age', '55'
```

8. Incremente a idade do italiano em 1
```
incr 'italians', '5', 'personal-data:age'
```