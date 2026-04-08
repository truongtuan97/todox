"use client"
import {
    Combobox,
    ComboboxContent,    
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from "./ui/combobox"
import { options } from "@/lib/data"

const DateTimeFilter = ({dateQuery, setDateQuery}) => {
    return (
        <Combobox items={options}>
            <ComboboxInput placeholder="Select an option" />
            <ComboboxContent>
                <ComboboxList>
                    {(item) => (
                        <ComboboxItem key={item.value} value={item.label} onSelect={() => setDateQuery(item.value)}>
                            {item.label}
                        </ComboboxItem>
                    )}
                </ComboboxList>
            </ComboboxContent>
        </Combobox>
    )
}

export default DateTimeFilter;