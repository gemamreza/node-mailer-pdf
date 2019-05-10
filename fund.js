 var score = [250,1820,870,1000,2000]

 totalCost = (arr) => {
    var hasil = 0
    for(var i = 0; i < arr.length ; i++){
        if(i > 0){
            for(var j = 0; j < i; j++){
                if(arr[i] > arr[j]){
                    hasil += 1
                }
            }
        }
         hasil += 10
    }
    return hasil
}

console.log(totalCost(score))

// line 6 akan masuk ke hasil += 10 karena i masil 0 > 0 menjadi false, lalu i++ i menjadi 1
// line 7 i sudah 1 > 0 = true, maka masuk ke looping j, maka bila i = 1 > dari j yaitu 0, maka akan ditambah 1