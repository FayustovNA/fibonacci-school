import { ElementStates } from "../../types/element-states";
import { waitTime } from "../../utils/wait-function";
import { DELAY_IN_MS } from "../../constants/delays";

export const reverseString = async (str: string, setSrting?: any, setLoader?:any ) => {
    let itemLine: any = str.split("").map((item: string) => {
      return { item, state: ElementStates.Default };
    });

    if (str!){
        let temp: any = null;
        const mid = Math.floor((itemLine.length) / 2);
    
        for (var i = 0, j = itemLine.length - 1; i < j; i++, j--) {
    
          if (i !== j) {
            temp = itemLine[j];
            itemLine[j].state = ElementStates.Changing;
            itemLine[i].state = ElementStates.Changing;
            await waitTime(DELAY_IN_MS);
          }
          itemLine[j] = itemLine[i];
          itemLine[i] = temp;
          itemLine[j].state = ElementStates.Modified;
          itemLine[i].state = ElementStates.Modified;
          if (setSrting) {setSrting([...itemLine]);}
        }
        await waitTime(DELAY_IN_MS);
    
        itemLine[mid].state = ElementStates.Modified;
    
        if (setSrting) {setSrting([...itemLine]);}
    return itemLine
    }
    
return []
}