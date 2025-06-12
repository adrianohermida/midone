import React, { useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

interface CalendarProps {
  events?: any[];
  initialView?: string;
  headerToolbar?: any;
  height?: string | number;
  editable?: boolean;
  selectable?: boolean;
  selectMirror?: boolean;
  dayMaxEvents?: boolean | number;
  weekends?: boolean;
  onDateSelect?: (selectInfo: any) => void;
  onEventClick?: (clickInfo: any) => void;
  onEventDrop?: (dropInfo: any) => void;
  onEventResize?: (resizeInfo: any) => void;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  events = [],
  initialView = "dayGridMonth",
  headerToolbar = {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  },
  height = "auto",
  editable = false,
  selectable = false,
  selectMirror = true,
  dayMaxEvents = true,
  weekends = true,
  onDateSelect,
  onEventClick,
  onEventDrop,
  onEventResize,
  className,
}) => {
  const calendarRef = useRef<FullCalendar>(null);

  return (
    <div className={className}>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        headerToolbar={headerToolbar}
        initialView={initialView}
        events={events}
        editable={editable}
        selectable={selectable}
        selectMirror={selectMirror}
        dayMaxEvents={dayMaxEvents}
        weekends={weekends}
        height={height}
        select={onDateSelect}
        eventClick={onEventClick}
        eventDrop={onEventDrop}
        eventResize={onEventResize}
        businessHours={{
          daysOfWeek: [1, 2, 3, 4, 5],
          startTime: "09:00",
          endTime: "18:00",
        }}
        themeSystem="bootstrap"
      />
    </div>
  );
};

// Draggable component for external events
interface DraggableProps {
  children: React.ReactNode;
  eventData?: any;
  className?: string;
  id?: string;
  options?: any;
}

export const Draggable: React.FC<DraggableProps> = ({
  children,
  eventData,
  className,
  id,
  options,
}) => {
  const draggableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (draggableRef.current) {
      // Check if Draggable is available before trying to use it
      if (typeof (window as any).Draggable === "function") {
        try {
          // Initialize draggable
          const draggable = new (window as any).Draggable(
            draggableRef.current,
            {
              itemSelector: ".fc-event",
              eventData: eventData,
              ...options,
            },
          );

          return () => {
            if (draggable && typeof draggable.destroy === "function") {
              draggable.destroy();
            }
          };
        } catch (error) {
          console.warn("Failed to initialize Draggable:", error);
        }
      } else {
        console.warn(
          "Draggable library not available. Drag functionality disabled.",
        );
      }
    }
  }, [eventData, options]);

  return (
    <div
      ref={draggableRef}
      className={className}
      id={id}
      draggable={true}
      onDragStart={(e) => {
        // Basic HTML5 drag functionality as fallback
        if (eventData) {
          e.dataTransfer.setData("application/json", JSON.stringify(eventData));
        }
      }}
    >
      {children}
    </div>
  );
};

export default Calendar;
