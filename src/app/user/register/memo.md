# memo
## use client
クライアント側で実行されるコードと定義する
## function Register
Register という名前の関数をアローで定義する
### useState
一つ目は状態変数、二つ目はセッターメソッド。
useState("")は、初期値が””と定義している。
### handleSubmit
e （イベントハンドラー）を受け取る
e がイベントハンドラーと分かるタイミングは、後段のreturnでかえすJSXの `<form onSubmit={handleSubmit}>`。
関数が form タグの onSubmit で呼ばれている。
onSubmit によって渡されたイベントが e にひきわたされる。
