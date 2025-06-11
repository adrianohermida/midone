import Lucide from "@/components/Base/Lucide";
import { Menu } from "@/components/Base/Headless";
import Button from "@/components/Base/Button";
import Calendar from "@/components/Calendar";
import { Draggable as FullCalendarDraggable } from "@/components/Base/Calendar";
import { Draggable } from "@fullcalendar/interaction";
import { FormSwitch } from "@/components/Base/Form";
import EventModal from "@/components/Calendar/EventModal";
import { useState } from "react";

interface Event {
  id: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  location?: string;
  attendees?: string[];
}

function Main() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: "1",
      title: "Audiência - Processo 001/2024",
      start: new Date().toISOString(),
      end: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
      category: "hearing",
      priority: "high",
      location: "Tribunal de Justiça - SP",
      description: "Audiência de instrução e julgamento",
    },
    {
      id: "2",
      title: "Reunião com Cliente",
      start: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + 25 * 60 * 60 * 1000).toISOString(),
      category: "client",
      priority: "medium",
      location: "Escritório",
      description: "Discussão sobre estratégia do caso",
    },
  ]);

  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const dragableOptions: Draggable["settings"] = {
    itemSelector: ".event",
    eventData(eventEl) {
      const getDays = () => {
        const days = eventEl.querySelectorAll(".event__days")[0]?.textContent;
        return days ? days : "0";
      };
      return {
        title: eventEl.querySelectorAll(".event__title")[0]?.innerHTML,
        duration: {
          days: parseInt(getDays()),
        },
      };
    },
  };

  const handleDateSelect = (selectInfo: any) => {
    setSelectedDate(selectInfo.start);
    setSelectedEvent(null);
    setEventModalOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = events.find((e) => e.id === clickInfo.event.id);
    if (event) {
      setSelectedEvent(event);
      setSelectedDate(null);
      setEventModalOpen(true);
    }
  };

  const handleEventSave = (eventData: Event) => {
    if (selectedEvent) {
      // Update existing event
      setEvents((prev) =>
        prev.map((e) =>
          e.id === selectedEvent.id
            ? { ...eventData, id: selectedEvent.id }
            : e,
        ),
      );
    } else {
      // Create new event
      const newEvent = {
        ...eventData,
        id: Date.now().toString(),
      };
      setEvents((prev) => [...prev, newEvent]);
    }
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Calendar</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
            onClick={() => {
              setSelectedEvent(null);
              setSelectedDate(null);
              setEventModalOpen(true);
            }}
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Novo Evento
          </Button>
          <Button variant="outline-primary" className="mr-2 shadow-md">
            Print Schedule
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button className="px-2 !box">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="Plus" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item>
                <Lucide icon="Share2" className="w-4 h-4 mr-2" /> Share
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Settings" className="w-4 h-4 mr-2" /> Settings
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Download" className="w-4 h-4 mr-2" /> Export
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5">
        {/* BEGIN: Calendar Side Menu */}
        <div className="col-span-12 xl:col-span-4 2xl:col-span-3">
          <div className="p-5 box intro-y">
            <Button
              variant="primary"
              type="button"
              className="w-full mt-2"
              onClick={() => {
                setSelectedEvent(null);
                setSelectedDate(null);
                setEventModalOpen(true);
              }}
            >
              <Lucide icon="FilePenLine" className="w-4 h-4 mr-2" /> Add New
              Schedule
            </Button>

            {/* Event Categories */}
            <div className="mt-6 mb-5 border-t border-b border-slate-200/60 dark:border-darkmode-400 py-4">
              <h3 className="font-medium mb-3">Categorias de Eventos</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-danger mr-2"></div>
                  <span>
                    Audiências (
                    {events.filter((e) => e.category === "hearing").length})
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                  <span>
                    Reuniões (
                    {events.filter((e) => e.category === "meeting").length})
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span>
                    Clientes (
                    {events.filter((e) => e.category === "client").length})
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-pending mr-2"></div>
                  <span>
                    Prazos (
                    {events.filter((e) => e.category === "deadline").length})
                  </span>
                </div>
              </div>
            </div>

            <FullCalendarDraggable
              id="calendar-events"
              options={dragableOptions}
              className="py-3 mt-6 mb-5 border-t border-b border-slate-200/60 dark:border-darkmode-400"
            >
              {events.slice(0, 5).map((event, index) => (
                <div key={event.id} className="relative">
                  <div className="flex items-center p-3 -mx-3 transition duration-300 ease-in-out rounded-md cursor-pointer event hover:bg-slate-100 dark:hover:bg-darkmode-400">
                    <div
                      className={`w-2 h-2 mr-3 rounded-full ${
                        event.priority === "high"
                          ? "bg-danger"
                          : event.priority === "medium"
                            ? "bg-warning"
                            : "bg-success"
                      }`}
                    ></div>
                    <div className="pr-10">
                      <div className="truncate event__title">{event.title}</div>
                      <div className="text-slate-500 text-xs mt-0.5">
                        <span className="event__days">1</span> Dia{" "}
                        <span className="mx-1">•</span>{" "}
                        {new Date(event.start).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                  <button
                    className="absolute top-0 bottom-0 right-0 flex items-center my-auto"
                    onClick={() => {
                      setSelectedEvent(event);
                      setEventModalOpen(true);
                    }}
                  >
                    <Lucide
                      icon="FilePenLine"
                      className="w-4 h-4 text-slate-500"
                    />
                  </button>
                </div>
              ))}

              <div
                className="p-3 text-center text-slate-500"
                style={{ display: events.length === 0 ? "block" : "none" }}
                id="calendar-no-events"
              >
                Nenhum evento agendado
              </div>
            </FullCalendarDraggable>

            <FormSwitch className="flex">
              <FormSwitch.Label htmlFor="checkbox-events">
                Remove after drop
              </FormSwitch.Label>
              <FormSwitch.Input
                className="ml-auto"
                type="checkbox"
                id="checkbox-events"
              />
            </FormSwitch>
          </div>

          <div className="p-5 mt-5 box intro-y">
            <div className="flex">
              <Lucide icon="ChevronLeft" className="w-5 h-5 text-slate-500" />
              <div className="mx-auto text-base font-medium">
                {new Date().toLocaleDateString("pt-BR", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <Lucide icon="ChevronRight" className="w-5 h-5 text-slate-500" />
            </div>
            <div className="grid grid-cols-7 gap-4 mt-5 text-center">
              <div className="font-medium">Dom</div>
              <div className="font-medium">Seg</div>
              <div className="font-medium">Ter</div>
              <div className="font-medium">Qua</div>
              <div className="font-medium">Qui</div>
              <div className="font-medium">Sex</div>
              <div className="font-medium">Sáb</div>

              {/* Generate calendar days dynamically */}
              {Array.from({ length: 35 }, (_, i) => {
                const date = new Date();
                const firstDay = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  1,
                );
                const startDate = new Date(
                  firstDay.setDate(firstDay.getDate() - firstDay.getDay()),
                );
                const currentDate = new Date(
                  startDate.setDate(startDate.getDate() + i),
                );
                const isCurrentMonth =
                  currentDate.getMonth() === new Date().getMonth();
                const isToday =
                  currentDate.toDateString() === new Date().toDateString();
                const hasEvents = events.some(
                  (e) =>
                    new Date(e.start).toDateString() ===
                    currentDate.toDateString(),
                );

                return (
                  <div
                    key={i}
                    className={`py-0.5 rounded relative cursor-pointer hover:bg-slate-100 dark:hover:bg-darkmode-400 ${
                      !isCurrentMonth ? "text-slate-500" : ""
                    } ${isToday ? "bg-primary text-white" : ""} ${
                      hasEvents && !isToday
                        ? "bg-success/20 dark:bg-success/30"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedDate(currentDate);
                      setSelectedEvent(null);
                      setEventModalOpen(true);
                    }}
                  >
                    {currentDate.getDate()}
                  </div>
                );
              })}
            </div>

            <div className="pt-5 mt-5 border-t border-slate-200/60 dark:border-darkmode-400">
              <div className="flex items-center">
                <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                <span className="truncate">Próximos Prazos</span>
                <div className="flex-1 h-px mx-3 border border-r border-dashed border-slate-200 xl:hidden"></div>
                <span className="font-medium xl:ml-auto">
                  {events.filter((e) => e.category === "deadline").length}
                </span>
              </div>
              <div className="flex items-center mt-4">
                <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                <span className="truncate">Audiências</span>
                <div className="flex-1 h-px mx-3 border border-r border-dashed border-slate-200 xl:hidden"></div>
                <span className="font-medium xl:ml-auto">
                  {events.filter((e) => e.category === "hearing").length}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* END: Calendar Side Menu */}

        {/* BEGIN: Calendar Content */}
        <div className="col-span-12 xl:col-span-8 2xl:col-span-9">
          <div className="p-5 box">
            <Calendar
              events={events.map((e) => ({
                id: e.id,
                title: e.title,
                start: e.start,
                end: e.end,
                backgroundColor:
                  e.category === "hearing"
                    ? "#ef4444"
                    : e.category === "client"
                      ? "#3b82f6"
                      : e.category === "deadline"
                        ? "#f59e0b"
                        : e.category === "meeting"
                          ? "#10b981"
                          : "#6b7280",
                borderColor: "transparent",
              }))}
              selectable={true}
              editable={true}
              onDateSelect={handleDateSelect}
              onEventClick={handleEventClick}
              height="600px"
            />
          </div>
        </div>
        {/* END: Calendar Content */}
      </div>

      {/* Event Modal */}
      <EventModal
        isOpen={eventModalOpen}
        onClose={() => {
          setEventModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSave={handleEventSave}
        event={selectedEvent}
        selectedDate={selectedDate}
      />
    </>
  );
}

export default Main;
