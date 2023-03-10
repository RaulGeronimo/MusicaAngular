CREATE DATABASE Musica;

USE Musica;

CREATE TABLE Pais(
    idPais INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Nacionalidad VARCHAR(70),
    Continente VARCHAR(50),
    Bandera TEXT
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Instrumento(
    idInstrumento INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(70),
    Descripcion TEXT,
    Foto TEXT
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Artista(
    idArtista INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(70),
    NombreArtistico VARCHAR(50),
    Genero CHAR,
    FechaNacimiento DATE,
    FechaFinado VARCHAR(50), /* DATE */
    Estatura DOUBLE,
    idNacionalidad INT,
    Instrumentos VARCHAR(100),
    TipoVoz VARCHAR(50),
    Foto TEXT,
    FOREIGN KEY (idNacionalidad) REFERENCES Pais(idPais) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Grupo(
    idGrupo INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Origen VARCHAR(200),
    Genero VARCHAR(200),
    Inicio DATE,
    Fin VARCHAR(50), /* DATE */
    Sellos VARCHAR(150),
    Estado VARCHAR(50),
    SitioWeb VARCHAR(50),
    Idioma VARCHAR(50),
    Logo TEXT
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Artista_Grupo(
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    idArtista INT,
    idGrupo INT,
    FechaInicio DATE,
    FechaFin VARCHAR(50), /* DATE */
    idInstrumento INT,
    FOREIGN KEY (idArtista) REFERENCES Artista(idArtista) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idGrupo) REFERENCES Grupo(idGrupo) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idInstrumento) REFERENCES Instrumento(idInstrumento) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Disquera(
    idDisquera INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(60),
    Fundacion DATE,
    Fundador VARCHAR(100),
    Generos VARCHAR(100),
    idPais INT,
    Logo TEXT,
    FOREIGN KEY (idPais) REFERENCES Pais(idPais) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Album(
    idAlbum INT PRIMARY KEY AUTO_INCREMENT,
    idGrupo INT,
    idDisquera INT,
    Nombre VARCHAR(60),
    Duracion TIME,
    Lanzamiento DATE,
    Grabacion VARCHAR(200),
    Genero VARCHAR(100),
    Portada TEXT,
    FOREIGN KEY (idGrupo) REFERENCES Grupo(idGrupo) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idDisquera) REFERENCES Disquera(idDisquera) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Canciones(
    idCancion INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(70),
    Duracion TIME,
    Publicacion DATE,
    Genero VARCHAR(100),
    Idioma VARCHAR(50)
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

CREATE TABLE Canciones_Album(
    Codigo INT PRIMARY KEY AUTO_INCREMENT,
    idAlbum INT,
    idCancion INT,
    Numero INT,
    FOREIGN KEY (idAlbum) REFERENCES Album(idAlbum) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (idCancion) REFERENCES Canciones(idCancion) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE = InnoDB DEFAULT CHARACTER SET = utf8;

/* --------------------------------------------------------------------------------------- VISTAS --------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------- ARTISTA --------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Artista AS
SELECT
Artista.idArtista,
Artista.Nombre,
Artista.NombreArtistico,
IF (Artista.Genero = 'H', 'Hombre', 'Mujer') AS Genero,
DATE_FORMAT(Artista.FechaNacimiento, "%d / %M / %Y") AS FechaNacimiento,
DATE_FORMAT(Artista.FechaFinado, "%d / %M / %Y") AS FechaFinado,
CASE
WHEN Artista.FechaFinado IS NULL OR Artista.FechaFinado <= 0 THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, Artista.FechaNacimiento, NOW()), 'a??os')
WHEN Artista.FechaFinado <= 0 THEN 'Fecha Invalida'
WHEN Artista.FechaNacimiento <= Artista.FechaFinado THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, Artista.FechaNacimiento, Artista.FechaFinado), 'a??os')
ELSE 'Fecha Invalida'
END AS Edad,
FORMAT(Artista.Estatura, 2) AS Estatura,
CONCAT_WS(' - ', Pais.Nombre, Pais.Nacionalidad) AS Pais,
Artista.Instrumentos,
Artista.TipoVoz,
Artista.Foto
FROM Artista
INNER JOIN Pais
ON Artista.idNacionalidad = Pais.idPais
ORDER BY Nombre;

/* ---------------------------------------------------------------------- GRUPO ---------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Grupo AS
SELECT
Grupo.idGrupo,
Grupo.Nombre,
Grupo.Origen,
Grupo.Genero,
DATE_FORMAT(Grupo.Inicio, "%d / %M / %Y") AS FechaInicio,
DATE_FORMAT(Grupo.Fin, "%d / %M / %Y") AS FechaFin,

DATE_FORMAT(Inicio, '%Y-%m-%d') AS Inicio,
Grupo.Fin AS Fin,
Grupo.Sellos,
Grupo.Estado,
Grupo.SitioWeb,
Grupo.Idioma,
Grupo.Logo,
COUNT(Album.idAlbum) AS Albumes
FROM Grupo
LEFT JOIN Album
ON Album.idGrupo = Grupo.idGrupo
GROUP BY (Grupo.idGrupo)
ORDER BY Grupo.Nombre;

/* ------------------------------------------------------------------ ARTISTA GRUPO ------------------------------------------------------------------ */
CREATE OR REPLACE VIEW
Vista_GrupoIntegrantes AS
SELECT
Artista_Grupo.Codigo,
Artista.idArtista,
Artista.Nombre,
Artista.NombreArtistico,
IF (Artista.Genero = 'H', 'Hombre', 'Mujer') AS Genero,
DATE_FORMAT(Artista.FechaNacimiento, "%d / %M / %Y") AS FechaNacimiento,
DATE_FORMAT(Artista.FechaFinado, "%d / %M / %Y") AS FechaFinado,

CASE
WHEN Artista.FechaFinado IS NULL OR Artista.FechaFinado <= 0 THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, Artista.FechaNacimiento, NOW()), 'a??os')
WHEN Artista.FechaFinado <= 0 THEN 'Fecha Invalida'
WHEN Artista.FechaNacimiento <= Artista.FechaFinado THEN CONCAT_WS(' ', TIMESTAMPDIFF(YEAR, Artista.FechaNacimiento, Artista.FechaFinado), 'a??os')
ELSE 'Fecha Invalida'
END AS Edad,

FORMAT(Artista.Estatura, 2) AS Estatura,
CONCAT_WS(' - ', Pais.Nombre, Pais.Nacionalidad) AS Pais,
Instrumento.Nombre AS Instrumento,
Artista.TipoVoz,
Artista.Foto,
DATE_FORMAT(Artista_Grupo.FechaInicio, "%d / %M / %Y") AS FechaInicio,
DATE_FORMAT(Artista_Grupo.FechaFin, "%d / %M / %Y") AS FechaFin,

CASE
WHEN Artista_Grupo.FechaFin IS NULL OR Artista_Grupo.FechaFin <= 0 THEN CONCAT_WS(' - ', YEAR(Artista_Grupo.FechaInicio), 'Actualidad')
ELSE CONCAT_WS(' - ', YEAR(Artista_Grupo.FechaInicio), YEAR(Artista_Grupo.FechaFin))
END AS Periodo,

Grupo.idGrupo,
Grupo.Nombre AS Grupo
FROM Artista
INNER JOIN Pais
ON Artista.idNacionalidad = Pais.idPais

LEFT JOIN Artista_Grupo
ON Artista.idArtista = Artista_Grupo.idArtista

LEFT JOIN Grupo
ON Grupo.idGrupo = Artista_Grupo.idGrupo

INNER JOIN Instrumento
ON Artista_Grupo.idInstrumento = Instrumento.idInstrumento

ORDER BY Nombre, FechaInicio DESC;

/* --------------------------------------------------------------------- DISQUERA --------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Disquera AS
SELECT
Disquera.idDisquera,
Disquera.Nombre,
DATE_FORMAT(Disquera.Fundacion, "%M / %Y") AS Fundacion,
Disquera.Fundador,
Disquera.Generos,
Pais.Nombre AS Pais,
Disquera.Logo
FROM Disquera
INNER JOIN Pais
ON Disquera.idPais = Pais.idPais
ORDER BY Nombre;

/* ---------------------------------------------------------------------- ALBUM ---------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Album AS
SELECT
Album.idAlbum,
Album.idGrupo,
Album.idDisquera,
Grupo.Nombre AS Grupo,
Disquera.Nombre AS Disquera,
Album.Nombre AS Nombre,
CONCAT_WS(' - ', Album.Nombre, Grupo.Nombre) AS Album,
COUNT(Canciones_Album.idCancion) AS Canciones,
IF(DATE_FORMAT(Album.Duracion, "%H") = '00', DATE_FORMAT(Album.Duracion, "%i:%s"), DATE_FORMAT(Album.Duracion, "%H:%i:%s")) AS DuracionF,
Album.Duracion AS Duracion,
DATE_FORMAT(Album.Lanzamiento, "%Y-%m-%d") AS Lanzamiento,
DATE_FORMAT(Album.Lanzamiento, "%d / %M / %Y") AS FechaLanzamiento,
Album.Grabacion,
Album.Genero,
Album.Portada
FROM Album
INNER JOIN Grupo
ON Album.idGrupo = Grupo.idGrupo

INNER JOIN Disquera
ON Album.idDisquera = Disquera.idDisquera

LEFT JOIN Canciones_Album
ON Album.idAlbum = Canciones_Album.idAlbum

GROUP BY(Album.idAlbum)
ORDER BY (Album.Nombre);

/* -------------------------------------------------------------------- CANCIONES -------------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_Canciones AS
SELECT
idCancion,
Nombre,
DATE_FORMAT(Duracion, "%i:%s") AS Duracion,
DATE_FORMAT(Publicacion, "%d / %M / %Y") AS Publicacion,
CONCAT_WS(' - ', Nombre, YEAR(Publicacion)) AS Cancion,
Genero,
Idioma
FROM Canciones
ORDER BY Nombre;

/* ----------------------------------------------------------------- CANCIONES ALBUM ----------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_CancionesAlbum AS
SELECT
Canciones_Album.Codigo,
Canciones.idCancion,
Album.idAlbum,
Album.Nombre AS Album,
Canciones_Album.Numero,
Canciones.Nombre,
DATE_FORMAT(Canciones.Duracion, "%i:%s") AS Duracion,
DATE_FORMAT(Publicacion, "%d / %M / %Y") AS Publicacion,
Canciones.Genero,
Idioma
FROM Canciones
INNER JOIN Canciones_Album
ON Canciones.idCancion = Canciones_Album.idCancion
INNER JOIN Album
ON Album.idAlbum = Canciones_Album.idAlbum
ORDER BY Nombre;

/* ----------------------------------------------------------------- CANCIONES GRUPO ----------------------------------------------------------------- */
CREATE OR REPLACE VIEW
Vista_CancionesGrupo AS
SELECT
Canciones_Album.Codigo,
Grupo.idGrupo,
Canciones.idCancion,
Canciones.Nombre,
DATE_FORMAT(Canciones.Duracion, "%i:%s") AS Duracion,
DATE_FORMAT(Canciones.Publicacion, "%d / %M / %Y") AS Publicacion,
Canciones.Genero,
Canciones.Idioma,
Album.Nombre AS Album,
Grupo.Nombre AS Grupo
FROM Canciones
INNER JOIN Canciones_Album
ON Canciones.idCancion = Canciones_Album.idCancion
INNER JOIN Album
ON Album.idAlbum = Canciones_Album.idAlbum
INNER JOIN Grupo
ON Album.idGrupo = Grupo.idGrupo
ORDER BY Nombre;

/* ----------------------------------------------------------------------------- PROCEDIMIENTOS ALMACENADOS ----------------------------------------------------------------------------- */
/* ------------------------------------------------------------------ ARTISTA GRUPO ------------------------------------------------------------------ */
DELIMITER $$
CREATE PROCEDURE `obtener_integrantes`(IN idGrupoB INT)
BEGIN
SELECT * FROM Vista_GrupoIntegrantes WHERE idGrupo = idGrupoB;
END$$

DELIMITER ;

/* ------------------------------------------------------------------- ALBUM GRUPO ------------------------------------------------------------------- */
DELIMITER $$
CREATE PROCEDURE `obtener_album`(IN idGrupoB INT)
BEGIN
SELECT * FROM Vista_Album WHERE idGrupo = idGrupoB ORDER BY Lanzamiento;
END$$

DELIMITER ;

/* ----------------------------------------------------------------- CANCIONES ALBUM ----------------------------------------------------------------- */
DELIMITER $$
CREATE PROCEDURE `obtener_cancionesAlbum`(IN idAlbumA INT)
BEGIN
SELECT * FROM Vista_CancionesAlbum WHERE idAlbum = idAlbumA ORDER BY Numero;
END$$

DELIMITER ;

/* ----------------------------------------------------------------- CANCIONES GRUPO ----------------------------------------------------------------- */
DELIMITER $$
CREATE PROCEDURE `obtener_canciones`(IN idGrupoB INT)
BEGIN
SELECT * FROM Vista_CancionesGrupo WHERE idGrupo = idGrupoB;
END$$

DELIMITER ;