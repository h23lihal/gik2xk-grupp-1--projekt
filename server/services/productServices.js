const db = require('../models');
const {
    createResponsSuccess,
    createResponsError,
    createResponsMessage
} = require('../helpers/responsHelper'); // Importerar hjälpfunktioner för att skapa svar
const validate = require('validate.js'); // Validering av indata
const constraints = {
    title: {
        length: {
            minimum: 2,
            maximum: 100,
            tooShort: '^Titeln måste vara minst %{count} tecken lång.',
            tooLong: '^Titeln får inte vara längre än %{count} tecken lång.'
        }
    }
};

// Funktion för att hämta produkt baserat på ID
async function getById(id) {
  try {
      const product = await db.products.findOne({
          where: { id },
          include: [
              {
                  model: db.ratings,
                  as: "ratings" // Inkluderar associerade betyg för produkten
              }
          ]
      });

      if (!product) {
          return createResponsError(404, "Produkten hittades inte"); // Om produkten inte finns, returnera fel
      }

      // Hämtar snittbetyg för produkten
      const averageRating = await db.ratings.findOne({
          where: { productId: id },
          attributes: [
              [db.sequelize.fn('AVG', db.sequelize.col('rating')), 'averageRating']
          ],
          raw: true
      });

      // Lägg till snittbetyg i svaret
      return createResponsSuccess({
          ...product.get(), // Omvandlar produktobjekt till JSON
          averageRating: averageRating.averageRating ? parseFloat(averageRating.averageRating).toFixed(1) : 0
      });

  } catch (error) {
      console.error("Fel vid hämtning av produkt:", error);
      return createResponsError(500, error.message || "Serverfel vid hämtning av produkt"); // Hantera serverfel
  }
}

// Funktion för att lägga till betyg på en produkt
async function addRating(productId, rating, comment) {
  try {
      const product = await db.products.findByPk(productId);
      if (!product) {
          return createResponsError(404, "Produkten hittades inte"); // Om produkten inte finns, returnera fel
      }

      const newRating = await db.ratings.create({ productId, rating, comment }); // Skapar ett nytt betyg

      return createResponsSuccess(newRating); // Returnera det skapade betyget

  } catch (error) {
      console.error("Fel vid tillägg av betyg:", error);
      return createResponsError(500, "Serverfel vid tillägg av betyg", error.message); // Hantera serverfel
  }
}

// Funktion för att hämta alla produkter
async function getAll(){
 try{
  const allProducts = await db.products.findAll(); // Hämtar alla produkter från databasen
  return createResponsSuccess(allProducts.map((products) => _formatProducts(products))); // Formaterar och returnerar produkter
}catch(error){
    return createResponsError(error.status,error.message); // Hantera eventuella fel
}
}

// Funktion för att skapa en ny produkt
async function create(products){
    const invalidData = validate(products, constraints); // Validerar indata
    if (invalidData) {
        return createResponsError(422, invalidData); // Returnera fel om datan är ogiltig
    } else {
        try{
            const newProducts = await db.products.create(products); // Skapar ny produkt i databasen
            return createResponsSuccess(newProducts); // Returnera den skapade produkten
        }catch(error) {
            return createResponsError(error.status, error.message); // Hantera eventuella fel vid skapande
        }
    }
}

// Funktion för att formatera produktdata innan det returneras
function _formatProducts(products) {
    return {
        id: products.id,
        title: products.title,
        description: products.description,
        price: products.price,
        imageUrl: products.imageUrl,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        ratings: products.ratings
    };
}

// Funktion för att uppdatera en produkt
async function update(products, id) {
  const invalidData = validate(products, constraints); // Validerar produktdata
  if (!id) {
    return (422, 'Id är obligatoriskt'); // Returnera fel om ID saknas
  }
  if (invalidData) {
    return (422, invalidData); // Returnera fel om validering misslyckas
  }
  try {
    const existingProducts = await db.products.findOne({ where: { id } });
    if (!existingProducts) {
      return (404, 'Hittade inget inlägg att uppdatera.'); // Returnera fel om produkten inte finns
    }

    // Uppdaterar produkten
    const updatedProducts = await db.products.update(products, { where: { id } });

    return {
      status: 200,
      message: 'Inlägget uppdaterades framgångsrikt', // Framgångsmeddelande
      data: updatedProducts,
    };
  } catch (error) {
    return (500, 'Ett oväntat fel inträffade', error); // Hantera serverfel vid uppdatering
  }
}

// Funktion för att ta bort en produkt
async function destroy(id) {
  if (!id) {
      return createResponsError(422, "Id är obligatoriskt"); // Returnera fel om ID saknas
  }
  try {
      const deleted = await db.products.destroy({ where: { id } }); // Raderar produkt från databasen
      if (!deleted) {
          return createResponsError(404, "Produkten hittades inte"); // Om ingen produkt raderas, returnera fel
      }
      return createResponsSuccess({ message: "Produkten har tagits bort" }); // Bekräftar borttagning
  } catch (error) {
      console.error("Fel vid borttagning av produkt:", error);
      return createResponsError(500, "Ett oväntat fel inträffade", error.message); // Hantera serverfel vid borttagning
  }
}

module.exports = {
    addRating,
    getById,
    getAll,
    create,
    update,
    destroy
};