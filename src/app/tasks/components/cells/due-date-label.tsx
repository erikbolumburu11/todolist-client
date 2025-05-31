import { formatDistanceStrict, isFuture, isToday, isTomorrow } from "date-fns";
import { format } from "date-fns/format";
import { CalendarIcon } from "lucide-react";

export default function TaskDueDateLabel({ date }: { date: Date }){
    return(
        <div className="flex items-center gap-1 text-sm">
            <DueDateLabel date={date}/>
            <DistanceFromDateLabel date={date}/>
        </div>
    );
}

function DueDateLabel({date} : {date: Date}){
    if(!date) return (
        <>
            <span className="me-2"><CalendarIcon size={20}/></span>
            <span>No due date</span>
        </>
    );

    return (
        <>
            <span className="me-2"><CalendarIcon size={20}/></span> {format(date, 'P')}
        </>
    );
}

function DistanceFromDateLabel({date} : {date: Date}) {
    if(!date) return null;

    if(isToday(date)){
        return(
            <span className="px-1">(Today)</span>
        );
    }

    if(isTomorrow(date)){
        return(
            <span className="px-1">(Tomorrow)</span>
        );
    }

    if(isFuture(date)){
        return(
            <span className="px-1">(Due in {formatDistanceStrict(date, new Date().toDateString())})</span>
        );
    }

    return(
        <span className="px-1">(Due {formatDistanceStrict(new Date().toDateString(), date)} ago)</span>
    );
}