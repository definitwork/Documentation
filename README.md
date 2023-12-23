## Документация человека

### Как скачать и приступить к работе.

1) Чтобы не решать проблемы, связанные с разной версией **Python**, всем обновиться до **3.11 или выше**.
2) Устанавливаем **PostgreSQL_16.1_64bit_Setup.exe** - файл сбрасывал Игорь в группе *Telegram* (если уже был установлен Postgres - удаляем, чтобы не разбираться с проблемами типо: "А ту ли я консоль psql вызвал", "А почему у меня не работает база данных как у остальных"). Во время установки выбираем локаль ru-RU, ставим птичку "Настроить переменные среды". Логин можно оставить *postgres*, ***пароль записываем или запоминаем***. Далее выбираем "Использовать параметры по умолчанию".
3) Следом устанавливаем **pgadmin4-8.0-x64.exe**. Также лежит в телеге.
4) В поиске Windows пишем "*psql*" и открываем консоль **SQL Shell (psql)**. Вводим пароль (он не отображается) для пользователя postgres. Если появилось приглашение к вводу SQL-команд "*postgres=# _*", пароль верен. Далее создаем нового пользователя БД, даем ему права и создаем БД (рекомендую просто копировать и вставлять команды, чтобы ничего не менять потом в *settings.py*, и жать Enter (точка с запятой в конце обязательна).
	```SQL
	CREATE USER docuser WITH PASSWORD 'docpass';
	ALTER ROLE docuser WITH CREATEDB;
	CREATE DATABASE docdb WITH OWNER docuser;
	```
5) Создаем новый каталог на вашем компьютере с названием *Documentation*, заходим в него, кликаем правой кнопкой, выбираем "*Git Bash Here*" или "*Открыть в Терминале*". Вставляем, то что в кавычка (не потеряете точку) "git clone https://github.com/definitwork/Documentation.git ." и жмем Enter.
6) Открываем проект в PyCharm и подключаем/активируем виртуальное окружение.
7) Для тех у кого **Linux** правим в *requirements.txt* "~~psycopg2~~" на "**psycopg2-binary**"
8) Бросаем в корень проекта (т.е. на уровень *manage.py*) файл "**.env**". Будет в телеге.
9) Устанавливаем все зависимости, убедившись, что вы в виртуальном окружении 
	```SH
	pip install -r requirements.txt
	```
10) Миграции
	```SH
	python manage.py migrate
	```
11) Суперпользователь
	```SH
	python manage.py createsuperuser
	```
12) Далее запускаем сервер
	```SH
	python manage.ry runserver
	```
	и сразу вбиваем один продукт в админке, картинка есть по дефолту, можно свою не искать http://127.0.0.1:8000/admin/
13) Переходим на http://127.0.0.1:8000/first_app/ и убеждаемся, что отображается картинка, стили и инфа из вашей первой записи в бд (Product)
14) Переходим на http://127.0.0.1:8000/first_app/api/ и убеждаемся, что работает DRF
15) Переходим на http://127.0.0.1:8000/doc/ и убеждаемся, что работает Swagger
16) Переходим на ветку **dev**
	```SH
	git checkout -b dev
	```
17) Получаем задачу, создаем от **dev** новую ветку и работаем в своей ветке. Сливаемся с *dev* только после завершения задачи.