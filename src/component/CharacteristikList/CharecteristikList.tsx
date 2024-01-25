import { useEffect,FC } from "react";
interface CharecteristikListProps {
    filter: string;
    pola: any;
  }
  interface CarMake {
    make_id: number;
    make_display: string;
    make_is_common: string;
    make_country: string;
  }
  
  const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';

export const CharecteristikList: FC<CharecteristikListProps >= ({filter,pola})=>{
    let filteredMakes:CarMake[]=[];

    useEffect(()=>{
    switch (pola.choose) {
        case "Makes":
            fetch('https://dog.ceo/api/breeds/image/random')
            // fetch('https://cors-anywhere.herokuapp.com/https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes',{
            //     method: 'GET',
                
            //   })
  .then(response => response.json())
  .then(data => {
    console.log(data)
    const allMakes = data.Makes;
    filteredMakes = allMakes.filter((make:CarMake) => make.make_display.toLowerCase().startsWith(filter));
    console.log(filteredMakes);
  })
  .catch(error => console.error('Помилка:', error));
            
            break;
    
        default:
            break;
    }
    
        
    },[filter])
        

    return (<div>
        {filteredMakes.length>0 && <ul>{filteredMakes.map(make=><li key={make.make_id} data-make-value={make.make_display}>{make.make_display}</li>)}</ul> }
    </div>)
}
// fetch(`https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes&year=${year}&sold_in_us=1&start=${letter}`)
// https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getMakes
// https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getModels&make=volvo
// https://www.carqueryapi.com/api/0.3/?callback=?&cmd=getTrims&make=volvo&model=v50
//8fTszXDj!ghirCQ password
//token f2bd4976e2f94f3896280ce88cf1eb06
//auth key Basic NTYzZjU5OGUtNTQ3NS00NzIwLWEyMGYtYzU4OTIxZmY1NTRm
