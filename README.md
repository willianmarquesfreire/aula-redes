````markdown
# 📚 Aula prática: HTTP + Criptografia (Node.js + OpenSSL)

Este projeto foi criado para fins didáticos, com dois objetivos:

1. Entender o funcionamento básico do protocolo **HTTP**
2. Demonstrar conceitos de **criptografia simétrica e assimétrica**

---

# 🌐 Parte 1 — Servidor HTTP simples (Node.js)

## 📌 Arquivo
- `http-server.js`

## ▶️ Como executar

```bash
node http-server.js
````

Saída esperada:

```
Servidor rodando em http://localhost:3000
```

---

## 📌 O que esse servidor faz

* Responde a qualquer método HTTP:

  * `GET`, `POST`, `PUT`, `DELETE`, `PATCH`
* Retorna um JSON indicando qual método foi usado
* Permite alterar o **status HTTP via query param**

---

## 🧪 Testando (REST Client ou curl)

### Exemplo com GET

```http
GET http://localhost:3000?status=200
```

### Exemplo com POST

```http
POST http://localhost:3000?status=201
```

---

### Exemplo com curl

```bash
curl -X POST "http://localhost:3000?status=201"
```

---

## 📌 Exemplos de resposta

### Sem status

```json
{
  "msg": "Você fez um GET"
}
```

### Com status

```json
{
  "msg": "Você fez um POST",
  "status": "Created"
}
```

---

## 📌 Conceitos abordados

* `req.method` → método HTTP
* `req.url` → URL da requisição
* Query params (`?status=200`)
* Status HTTP
* Headers (`Content-Type`)
* Resposta JSON

---

# 🔐 Parte 2 — Criptografia com OpenSSL

## 📌 Arquivo

* `criptografia.sh`

> Você pode executar linha por linha no terminal

---

# 🔑 1. Criptografia Simétrica

## 📌 Criptografar

```bash
echo "mensagem secreta" | openssl enc -aes-256-cbc -salt -out msg.enc
```

* Será solicitada uma senha
* Essa senha é a **chave**

---

## 📌 Descriptografar

```bash
openssl enc -aes-256-cbc -d -in msg.enc
```

---

## 📌 Conceito

* Mesma chave para criptografar e descriptografar
* Problema: **como compartilhar a chave com segurança?**

---

# 🔐 2. Criptografia Assimétrica (RSA)

## 📌 Gerar chave privada

```bash
openssl genpkey -algorithm RSA -out private.pem
```

## 📌 Gerar chave pública

```bash
openssl rsa -pubout -in private.pem -out public.pem
```

---

## 📌 Criptografar (chave pública)

```bash
echo "mensagem secreta" | openssl pkeyutl -encrypt -pubin -inkey public.pem -out msg.enc
```

---

## 📌 Descriptografar (chave privada)

```bash
openssl pkeyutl -decrypt -inkey private.pem -in msg.enc
```

---

## 📌 Conceito

* Chave pública → usada para criptografar
* Chave privada → usada para descriptografar
* Resolve o problema de distribuição de chave

---

# ⚠️ Observações importantes

* RSA **não é usado para grandes dados**
* Uso real (ex: HTTPS):

  * RSA → troca de chave
  * AES → criptografia dos dados

---

# 🧠 Resumo didático

| Tipo        | Chaves              | Vantagem             | Problema              |
| ----------- | ------------------- | -------------------- | --------------------- |
| Simétrica   | 1 (compartilhada)   | Rápida               | Distribuição da chave |
| Assimétrica | 2 (pública/privada) | Mais segura p/ troca | Mais lenta            |


