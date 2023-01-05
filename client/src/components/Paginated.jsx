import React from 'react';

export default function Paginated ({charactersPerPage, currentPage, paginated, characterFilter}){
    const PageNumbers = []

    for (let i = 0; i <= Math.ceil(characterFilter/charactersPerPage); i++) {
        PageNumbers.push(i)
    };

    function handlePrev(){
        if(currentPage <= 1) return;
        paginated(currentPage - 1)
    }

    function handleNext(){
        if(currentPage >= PageNumbers.length) return;
        paginated(currentPage + 1)
    }
    return(
        <div className='buttons'>
            {currentPage === 1 ? <div></div> : <button onClick={()=> handlePrev()}>prev</button>}
            <span className='paginated'>
                {PageNumbers && PageNumbers.map(number=>(
                    <button className='number' key= {number.id} onClick={()=> paginated(number)}>{number}</button>
                ))}
            </span>
            {currentPage === PageNumbers.length ? <div></div> :
            <button onClick={()=>handleNext()}>next</button>}
        </div>
    )
}