# Criptografia simétrica

## Criptografar
echo "mensagem secreta" | openssl enc -aes-256-cbc -salt -out msg.enc

## Descriptografar
openssl enc -aes-256-cbc -d -in msg.enc


# Criptografia assimétrica
## Gerar a chave privada
openssl genpkey -algorithm RSA -out private.pem

## Gerar a chave pública
openssl rsa -pubout -in private.pem -out public.pem

## Criptografar usando a chave pública 
echo "mensagem secreta" | openssl pkeyutl -encrypt -pubin -inkey public.pem -out msg.enc

## Descriptografar usando a chave privada
openssl pkeyutl -decrypt -inkey private.pem -in msg.enc
