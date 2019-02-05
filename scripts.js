const outEl = document.querySelector("#output")
outEl.innerHTML = "<h1>Active Businesses</h1>"

const nybiz = document.querySelector("#nybiz")
nybiz.innerHTML = "<h1>New York Businesses</h1>"

const nybiziz = document.querySelector("#nybiziz")

const manheader = document.querySelector("#manheader")
manheader.innerHTML = "<h1>Manufacturing Businesses</h1>"

const manbiz = document.querySelector("#manbiz")

const orderTotalz = document.querySelector("#orderTotals")
orderTotalz.innerHTML = "<h1> Business Order Totals </h1> "

const orderTotalsbiz = document.querySelector("#orderTotalsbiz")

const bigBizSpenders = document.querySelector("#bigSpender")
bigBizSpenders.innerHTML = "<h1> Big Spenders </h1>"




businesses.forEach(business => {
    outEl.innerHTML += `
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
    ${business.addressCity}, ${business.addressStateCode}
    </section>
    <section>
    ${business['addressZipCode']}
    </section>
  `
    outEl.innerHTML += "<hr/>"
});


// Array to contain all the New York businesses
const newYorkBusinesses = businesses.filter(business => {
    let inNewYork = false

    if (business.addressStateCode === "NY") {
        inNewYork = true
    }

    return inNewYork
})
newYorkBusinesses.forEach(business => {
    nybiziz.innerHTML += `
    
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
    ${business.addressCity}, ${business.addressStateCode}
    </section>
    <section>
    ${business['addressZipCode']}
    </section>
  `
  nybiziz.innerHTML += "<hr/>"
});

console.log(newYorkBusinesses)

//   Lightning Exercise: Use filter() to create another array named 
//   manufacturingBusinesses that will contain all businesses in the 
//   manufacturing industry. Display those to the DOM.

const manufacturingBusinesses = businesses.filter(business => {
    let Industrymanufacture = false

    if (business.companyIndustry === "Manufacturing") {
        Industrymanufacture = true
    }
    return Industrymanufacture
})
console.log(manufacturingBusinesses)



manufacturingBusinesses.forEach(business => {
    manbiz.innerHTML += `
   
    <h2>${business.companyName}</h2>
    <section>
      ${business.addressFullStreet}
    </section>
    <section>
    ${business.addressCity}, ${business.addressStateCode}
    </section>
    <section>
    ${business['addressZipCode']}
    </section>
  `
  manbiz.innerHTML += "<hr/>"
});




outEl.innerHTML += "<h1>Purchasing Agents</h1>";

/*
    Using map(), you extract the purchasing agent object
    from each business and store it in a new array
*/
const agents = businesses.map(business => {
    return {
        "fullName": business.purchasingAgent,
        "company": business.companyName,
        "phoneNumber": business.phoneWork
    }
        ;



})

console.table(agents)

agents.forEach(agent => {
    outEl.innerHTML += `<h2>${agent.fullName.nameFirst} 
    ${agent.fullName.nameLast}</h2>
  <h3>${agent.company}</h3>
  <section>${agent.phoneNumber}</section>`
    outEl.innerHTML += "<hr/>";
});




document.querySelector("#companySearch").addEventListener("keypress", keyPressEvent => {
    if (keyPressEvent.charCode === 13) {
        /* WHEN  USER PRESSES ENTER, FIND MATCHING BUSINESS */

        const foundBusiness = businesses.find(
            business =>
               ( business.purchasingAgent.nameFirst.includes(keyPressEvent.target.value) ||
               business.purchasingAgent.nameLast.includes(keyPressEvent.target.value))
                
        );

        outEl.innerHTML = `
                <h1>
                ${foundBusiness.companyName}
                </h1>
                <h3>Purchsing Agent: ${foundBusiness.purchasingAgent.nameFirst}
                ${foundBusiness.purchasingAgent.nameLast}

                </h3>
                <section>
                ${foundBusiness.addressFullStreet}

                </section>
                <section>
                ${foundBusiness.addressCity},
                ${foundBusiness.addressStateCode}
                ${foundBusiness.addressZipCode}
                </section>
            `;
    }
});


businesses.forEach(business => {
    /* CALCULATE ORDER SUMMARY */
 
let totalOrders = business.orders.reduce(
    (currentTotal, nextValue) => currentTotal += nextValue,
    0
)


orderTotalsbiz.innerHTML += `

        <h2>
            ${business.companyName}
            ($${totalOrders})
        </h2>
        <section>
            ${business.addressFullStreet}
        </section>
        <section>
            ${business.addressCity},
            ${business.addressStateCode}
            ${business.addressZipCode}
        </section>
    `;
    orderTotalsbiz.innerHTML += "<hr/>";
});

// Array to contain all the big spenders
const bigSpenders = businesses.filter(business => {
       if (business.orders.find(order => {
            return order > 9000
       })) {
        return business
        
    }
    console.log()
    
})

bigSpenders.forEach(business =>
    {
        bigBizSpenders.innerHTML += `
        
        <h2>${business.companyName}</h2>
        <section>
          ${business.addressFullStreet}
        </section>
        <section>
        ${business.addressCity}, ${business.addressStateCode}
        </section>
        <section>
        ${business['addressZipCode']}
        </section>
      `
        outEl.innerHTML += "<hr/>"
    })









