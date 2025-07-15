##  Data Model Diagram


Category
---------
_id (PK)
name (string)

Product
---------
_id (PK)
name (string)
description (string)
price (number)
discount (number)
image (string)
status (enum)
productCode (string, unique)
category (FK → Category._id)
