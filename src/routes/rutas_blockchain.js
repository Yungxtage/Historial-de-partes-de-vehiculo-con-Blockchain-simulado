const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  const blockchain = req.app.get("blockchain");
  const id  = req.query.id
  if( id ) {
    const indexbloque = blockchain.chain.findIndex(bloque => {
      return bloque.data?.id == id
    })
    console.log(indexbloque)
    if (indexbloque != -1){
      const bloquebuscado = blockchain.chain.slice(indexbloque, indexbloque + 1)
      
      const json_objeto = bloquebuscado[0]
      res.json(json_objeto);
    } else {
      res.status(500).json({error: "No se encuentra el producto"})
    }
  } else {
    res.json(blockchain.chain);
  }
});

// router.get("/:id", (req, res) => {
//   const blockchain = req.app.get("blockchain");
//   const id  = req.query.id
  
//   console.log("dsfdsfsdfdsfds")
  
//   const indexbloque = blockchain.chain.findIndex(bloque => {
//     return bloque.data?.id == id
//   })

//   const bloquebuscado = blockchain.chain.slice(indexbloque, indexbloque + 1)
  
//   const json_objeto = bloquebuscado[0]
//   res.json(json_objeto);
// });

router.post("/", (req, res) => {
  const { id , estado, ciudad, proceso } = req.body;
  //console.log(req.body)
  if (id && estado && ciudad && proceso) {
    const blockchain = req.app.get("blockchain");

    const nuevoBloque = {
      id,
      fecha_transaccion: new Date(),
      estado,
      ciudad,
      proceso
    }
   
    blockchain.addBlock(nuevoBloque)
    res.redirect('/');
  
  } else {
    res.status(500).send("Error with request");
  }
});

module.exports = router;