import { useState, useEffect } from "react";
import { Dialog } from "@/components/Base/Headless";
import {
  FormInput,
  FormLabel,
  FormTextarea,
  FormSelect,
} from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import Lucide from "@/components/Base/Lucide";

interface Event {
  id?: string;
  title: string;
  start: string;
  end: string;
  description?: string;
  category: string;
  priority: "low" | "medium" | "high";
  location?: string;
  attendees?: string[];
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: Event) => void;
  event?: Event | null;
  selectedDate?: Date | null;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  selectedDate,
}) => {
  const [formData, setFormData] = useState<Event>({
    title: "",
    start: "",
    end: "",
    description: "",
    category: "meeting",
    priority: "medium",
    location: "",
    attendees: [],
  });

  const [attendeeInput, setAttendeeInput] = useState("");

  useEffect(() => {
    if (event) {
      setFormData(event);
    } else if (selectedDate) {
      const dateStr = selectedDate.toISOString().split("T")[0];
      setFormData({
        ...formData,
        start: `${dateStr}T09:00`,
        end: `${dateStr}T10:00`,
      });
    } else {
      // Reset form
      setFormData({
        title: "",
        start: "",
        end: "",
        description: "",
        category: "meeting",
        priority: "medium",
        location: "",
        attendees: [],
      });
    }
  }, [event, selectedDate, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.start || !formData.end) return;

    onSave(formData);
    onClose();
  };

  const handleInputChange = (field: keyof Event, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addAttendee = () => {
    if (
      attendeeInput.trim() &&
      !formData.attendees?.includes(attendeeInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        attendees: [...(prev.attendees || []), attendeeInput.trim()],
      }));
      setAttendeeInput("");
    }
  };

  const removeAttendee = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      attendees: prev.attendees?.filter((a) => a !== email) || [],
    }));
  };

  const categories = [
    { value: "meeting", label: "Reunião" },
    { value: "hearing", label: "Audiência" },
    { value: "deadline", label: "Prazo" },
    { value: "appointment", label: "Compromisso" },
    { value: "court", label: "Tribunal" },
    { value: "client", label: "Cliente" },
    { value: "personal", label: "Pessoal" },
    { value: "other", label: "Outro" },
  ];

  const priorities = [
    { value: "low", label: "Baixa", color: "text-success" },
    { value: "medium", label: "Média", color: "text-warning" },
    { value: "high", label: "Alta", color: "text-danger" },
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="w-96">
      <Dialog.Panel>
        <Dialog.Title>
          <h2 className="mr-auto text-base font-medium">
            {event ? "Editar Evento" : "Novo Evento"}
          </h2>
        </Dialog.Title>

        <Dialog.Description>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <FormLabel htmlFor="event-title">Título *</FormLabel>
              <FormInput
                id="event-title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Digite o título do evento"
                required
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="event-start">Data/Hora Início *</FormLabel>
                <FormInput
                  id="event-start"
                  type="datetime-local"
                  value={formData.start}
                  onChange={(e) => handleInputChange("start", e.target.value)}
                  required
                />
              </div>
              <div>
                <FormLabel htmlFor="event-end">Data/Hora Fim *</FormLabel>
                <FormInput
                  id="event-end"
                  type="datetime-local"
                  value={formData.end}
                  onChange={(e) => handleInputChange("end", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Category and Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="event-category">Categoria</FormLabel>
                <FormSelect
                  id="event-category"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </FormSelect>
              </div>
              <div>
                <FormLabel htmlFor="event-priority">Prioridade</FormLabel>
                <FormSelect
                  id="event-priority"
                  value={formData.priority}
                  onChange={(e) =>
                    handleInputChange("priority", e.target.value)
                  }
                >
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </FormSelect>
              </div>
            </div>

            {/* Location */}
            <div>
              <FormLabel htmlFor="event-location">Local</FormLabel>
              <FormInput
                id="event-location"
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Local do evento"
              />
            </div>

            {/* Description */}
            <div>
              <FormLabel htmlFor="event-description">Descrição</FormLabel>
              <FormTextarea
                id="event-description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Descrição detalhada do evento"
                rows={3}
              />
            </div>

            {/* Attendees */}
            <div>
              <FormLabel htmlFor="event-attendees">Participantes</FormLabel>
              <div className="flex gap-2 mb-2">
                <FormInput
                  id="event-attendees"
                  type="email"
                  value={attendeeInput}
                  onChange={(e) => setAttendeeInput(e.target.value)}
                  placeholder="email@exemplo.com"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addAttendee();
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline-primary"
                  size="sm"
                  onClick={addAttendee}
                >
                  <Lucide icon="Plus" className="w-4 h-4" />
                </Button>
              </div>

              {formData.attendees && formData.attendees.length > 0 && (
                <div className="space-y-1">
                  {formData.attendees.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-slate-100 rounded"
                    >
                      <span className="text-sm">{email}</span>
                      <Button
                        type="button"
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeAttendee(email)}
                      >
                        <Lucide icon="X" className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </form>
        </Dialog.Description>

        <Dialog.Footer>
          <Button
            type="button"
            variant="outline-secondary"
            onClick={onClose}
            className="w-20 mr-1"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="w-20"
            onClick={handleSubmit}
          >
            {event ? "Salvar" : "Criar"}
          </Button>
        </Dialog.Footer>
      </Dialog.Panel>
    </Dialog>
  );
};

export default EventModal;
