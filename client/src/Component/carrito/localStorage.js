
export function  sumarCarritoLocal(prodStock,cantidad,selectedProduct,id){
    localStorage.setItem("stock",JSON.stringify(
        Object.assign(JSON.parse(localStorage.stock),
            {[id]:{ cantidad:prodStock ? parseInt(prodStock.cantidad)+cantidad : cantidad,
                     stock: prodStock ? prodStock.stock-cantidad : selectedProduct.stock-cantidad,
                    precio:prodStock ?  selectedProduct.price*(prodStock.cantidad+cantidad) : selectedProduct.price*cantidad
                    }
                    })))
}

export function enviarAlCarritoLocalStorage(selectedProduct){
    localStorage.setItem("carritoLocal",JSON.stringify(
        JSON.parse(localStorage.getItem("carritoLocal"))            
        .concat(selectedProduct)))
}

export function  SumarRestarCantidad(prodStock,cantidad,selectedProduct,id){
    
    localStorage.setItem("stock",JSON.stringify(
        Object.assign(JSON.parse(localStorage.stock),
            {[id]:{ cantidad: cantidad,
                     stock: selectedProduct.stock-cantidad,
                    precio: selectedProduct.price * cantidad
                    }
                    })))
}

export function  eliminarItems(prodStock,id,borrar){
    var obj=JSON.parse(localStorage.stock)
    var precioProd=prodStock.precio
    var precioTotal=JSON.parse(localStorage.total)
    console.log(precioTotal-precioProd);

    localStorage.setItem("total",JSON.stringify(precioTotal-precioProd))
    delete obj[id]
   
    localStorage.setItem("stock",JSON.stringify(obj))
    borrar(id)
}
