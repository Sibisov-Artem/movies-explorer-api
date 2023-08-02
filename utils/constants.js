// сообщения ответов и ошибок (константы приложения) вынесены в отдельный файл с константами
module.exports.MESSAGE_ERROR_BAD_REQUEST_DEFAULT = 'Ошибка запроса';

module.exports.MESSAGE_ERROR_BAD_REQUEST_CREATE_MOVIE = 'При создании переданы некорректные данные.';
module.exports.MESSAGE_ERROR_BAD_REQUEST_DELETE_MOVIE = 'Удаление фильма с некорректным id.';

module.exports.MESSAGE_ERROR_BAD_REQUEST_UPDATE_USER_INFO_BY_ID = 'Переданы некорректные данные при обновлении пользователя.';
module.exports.MESSAGE_ERROR_BAD_REQUEST_CREATE_USER = 'Переданы некорректные данные при создании пользователя.';

// ------------------------------------------------------------------

module.exports.MESSAGE_ERROR_CONFLICT_DEFAULT = 'Конфликт данных';

module.exports.MESSAGE_ERROR_CONFLICT__CREATE_USER = 'Конфликт данных. Этот адрес почты уже занят';

// ------------------------------------------------------------------

module.exports.MESSAGE_ERROR_FORBIDDEN_DEFAULT = 'Не доступно, заблокировано';

module.exports.MESSAGE_ERROR_FORBIDDEN_DELETE_MOVIE = 'Удалять фильмы других пользователей недопустимо';

// ------------------------------------------------------------------

module.exports.MESSAGE_ERROR_NOT_FOUND_DEFAULT = 'Данные не найдены';

module.exports.MESSAGE_ERROR_NOT_FOUND_DELETE_MOVIE = 'Фильм с указанным _id не найден.';

module.exports.MESSAGE_ERROR_NOT_FOUND_UPDATE_USER_INFO_BY_ID = 'Пользователь с указанным _id не найден.';

// ------------------------------------------------------------------

module.exports.MESSAGE_ERROR_UNAUTHORIZED_DEFAULT = 'Ошибка авторизации';

module.exports.MESSAGE_ERROR_UNAUTHORIZED_LOGIN = 'Неправильные почта или пароль';

module.exports.MESSAGE_ERROR_UNAUTHORIZED_AUTHORIZATION = 'Необходима авторизация';

// ------------------------------------------------------------------
