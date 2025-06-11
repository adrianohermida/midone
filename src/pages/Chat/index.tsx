import _ from "lodash";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import fakerData from "@/utils/faker";
import Button from "@/components/Base/Button";
import { FormInput, FormTextarea } from "@/components/Base/Form";
import Lucide from "@/components/Base/Lucide";
import { Menu, Tab, Dialog } from "@/components/Base/Headless";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: Date;
  type: "text" | "file" | "image";
  isRead: boolean;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "away";
  lastSeen?: Date;
  unreadCount: number;
}

function Main() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock contacts data
  const [contacts] = useState<Contact[]>(
    fakerData.slice(0, 15).map((faker, index) => ({
      id: `contact-${index}`,
      name: faker.users[0].name,
      avatar: faker.photos[0],
      status: index % 3 === 0 ? "online" : index % 3 === 1 ? "away" : "offline",
      lastSeen: new Date(Date.now() - Math.random() * 86400000),
      unreadCount: Math.floor(Math.random() * 5),
    })),
  );

  // Mock messages for active chat
  useEffect(() => {
    if (activeChat) {
      const mockMessages: Message[] = [
        {
          id: "msg-1",
          senderId: activeChat,
          senderName: contacts.find((c) => c.id === activeChat)?.name || "User",
          senderAvatar: contacts.find((c) => c.id === activeChat)?.avatar || "",
          content: "Olá! Como posso ajudá-lo com seu caso?",
          timestamp: new Date(Date.now() - 3600000),
          type: "text",
          isRead: true,
        },
        {
          id: "msg-2",
          senderId: "current-user",
          senderName: "Você",
          senderAvatar: fakerData[0].photos[0],
          content: "Preciso de ajuda com a documentação do processo 123/2024",
          timestamp: new Date(Date.now() - 3000000),
          type: "text",
          isRead: true,
        },
        {
          id: "msg-3",
          senderId: activeChat,
          senderName: contacts.find((c) => c.id === activeChat)?.name || "User",
          senderAvatar: contacts.find((c) => c.id === activeChat)?.avatar || "",
          content:
            "Claro! Vou verificar os documentos necessários e te envio em alguns minutos.",
          timestamp: new Date(Date.now() - 2400000),
          type: "text",
          isRead: true,
        },
      ];
      setMessages(mockMessages);
    }
  }, [activeChat, contacts]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: "current-user",
      senderName: "Você",
      senderAvatar: fakerData[0].photos[0],
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      isRead: false,
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Simulate response
    setTimeout(
      () => {
        const response: Message = {
          id: `msg-${Date.now()}-response`,
          senderId: activeChat,
          senderName: contacts.find((c) => c.id === activeChat)?.name || "User",
          senderAvatar: contacts.find((c) => c.id === activeChat)?.avatar || "",
          content: "Entendi. Vou analisar e retorno em breve.",
          timestamp: new Date(),
          type: "text",
          isRead: false,
        };
        setMessages((prev) => [...prev, response]);
      },
      1000 + Math.random() * 2000,
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "online":
        return "bg-success";
      case "away":
        return "bg-warning";
      case "offline":
        return "bg-slate-400";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 1) return "agora há pouco";
    if (hours < 24) return `${hours}h atrás`;
    return date.toLocaleDateString("pt-BR");
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8 intro-y sm:flex-row">
        <h2 className="mr-auto text-lg font-medium">Chat</h2>
        <div className="flex w-full mt-4 sm:w-auto sm:mt-0">
          <Button
            variant="primary"
            className="mr-2 shadow-md"
            onClick={() => setShowGroupModal(true)}
          >
            <Lucide icon="Plus" className="w-4 h-4 mr-2" />
            Nova Conversa
          </Button>
          <Menu className="ml-auto sm:ml-0">
            <Menu.Button as="button" className="px-2 !box text-slate-500">
              <span className="flex items-center justify-center w-5 h-5">
                <Lucide icon="MoreVertical" className="w-4 h-4" />
              </span>
            </Menu.Button>
            <Menu.Items className="w-40">
              <Menu.Item onClick={() => setShowGroupModal(true)}>
                <Lucide icon="Users" className="w-4 h-4 mr-2" /> Criar Grupo
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Settings" className="w-4 h-4 mr-2" />{" "}
                Configurações
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Archive" className="w-4 h-4 mr-2" /> Conversas
                Arquivadas
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5 mt-5 intro-y">
        {/* BEGIN: Chat Side Menu */}
        <Tab.Group className="col-span-12 lg:col-span-4 2xl:col-span-3">
          <div className="pr-1 intro-y">
            <div className="p-2 box">
              <Tab.List variant="pills">
                <Tab>
                  <Tab.Button className="w-full py-2" as="button">
                    Conversas
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button className="w-full py-2" as="button">
                    Contatos
                  </Tab.Button>
                </Tab>
                <Tab>
                  <Tab.Button className="w-full py-2" as="button">
                    Perfil
                  </Tab.Button>
                </Tab>
              </Tab.List>
            </div>
          </div>

          <Tab.Panels>
            <Tab.Panel>
              <div className="pr-1">
                <div className="px-5 pt-5 pb-5 mt-5 box lg:pb-0">
                  {/* Search */}
                  <div className="relative text-slate-500">
                    <FormInput
                      type="text"
                      className="px-4 py-3 pr-10 border-transparent bg-slate-100"
                      placeholder="Buscar conversas..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Lucide
                      icon="Search"
                      className="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3"
                    />
                  </div>

                  {/* Online Users */}
                  <div className="overflow-x-auto scrollbar-hidden">
                    <div className="flex mt-5">
                      {contacts
                        .filter((c) => c.status === "online")
                        .slice(0, 10)
                        .map((contact) => (
                          <button
                            key={contact.id}
                            className="w-10 mr-4 cursor-pointer"
                            onClick={() => setActiveChat(contact.id)}
                          >
                            <div className="relative flex-none w-10 h-10 rounded-full image-fit">
                              <img
                                alt={contact.name}
                                className="rounded-full"
                                src={contact.avatar}
                              />
                              <div
                                className={clsx([
                                  "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                                  getStatusColor(contact.status),
                                ])}
                              ></div>
                            </div>
                            <div className="mt-2 text-xs text-center truncate text-slate-500">
                              {contact.name.split(" ")[0]}
                            </div>
                          </button>
                        ))}
                    </div>
                  </div>

                  {/* Chat List */}
                  <div className="mt-5">
                    {filteredContacts.map((contact) => (
                      <button
                        key={contact.id}
                        className={clsx([
                          "w-full text-left p-3 rounded-lg transition-colors mb-2",
                          activeChat === contact.id
                            ? "bg-primary/10 border border-primary/20"
                            : "hover:bg-slate-100 dark:hover:bg-darkmode-400",
                        ])}
                        onClick={() => setActiveChat(contact.id)}
                      >
                        <div className="flex items-center">
                          <div className="relative flex-none w-12 h-12 mr-3 rounded-full image-fit">
                            <img
                              alt={contact.name}
                              className="rounded-full"
                              src={contact.avatar}
                            />
                            <div
                              className={clsx([
                                "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                                getStatusColor(contact.status),
                              ])}
                            ></div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-sm font-medium truncate">
                                {contact.name}
                              </h3>
                              <span className="text-xs text-slate-500">
                                {contact.status === "online"
                                  ? "online"
                                  : formatLastSeen(contact.lastSeen!)}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                              {contact.status === "online"
                                ? "Online agora"
                                : `Visto por último ${formatLastSeen(contact.lastSeen!)}`}
                            </p>
                          </div>
                          {contact.unreadCount > 0 && (
                            <div className="flex items-center justify-center w-5 h-5 ml-2 text-xs text-white rounded-full bg-danger">
                              {contact.unreadCount}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="pr-1">
                <div className="px-5 pt-5 pb-5 mt-5 box">
                  <div className="text-center">
                    <Lucide
                      icon="Users"
                      className="w-12 h-12 mx-auto text-slate-400 mb-4"
                    />
                    <h3 className="text-lg font-medium">Contatos</h3>
                    <p className="text-slate-500 text-sm">
                      Gerencie seus contatos e grupos
                    </p>
                    <Button variant="primary" className="mt-4">
                      <Lucide icon="Plus" className="w-4 h-4 mr-2" />
                      Adicionar Contato
                    </Button>
                  </div>
                </div>
              </div>
            </Tab.Panel>

            <Tab.Panel>
              <div className="pr-1">
                <div className="px-5 pt-5 pb-5 mt-5 box">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full image-fit">
                      <img
                        alt="Profile"
                        className="rounded-full"
                        src={fakerData[0].photos[0]}
                      />
                    </div>
                    <h3 className="text-lg font-medium">João Silva</h3>
                    <p className="text-slate-500 text-sm mb-4">Advogado</p>
                    <div className="space-y-2">
                      <Button variant="outline-primary" className="w-full">
                        <Lucide icon="Edit" className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </Button>
                      <Button variant="outline-secondary" className="w-full">
                        <Lucide icon="Settings" className="w-4 h-4 mr-2" />
                        Configurações
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        {/* END: Chat Side Menu */}

        {/* BEGIN: Chat Content */}
        <div className="col-span-12 lg:col-span-8 2xl:col-span-9">
          <div className="h-[600px] flex flex-col box">
            {activeChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center p-5 border-b border-slate-200 dark:border-darkmode-400">
                  <div className="relative flex-none w-10 h-10 mr-3 rounded-full image-fit">
                    <img
                      alt="Chat Contact"
                      className="rounded-full"
                      src={contacts.find((c) => c.id === activeChat)?.avatar}
                    />
                    <div
                      className={clsx([
                        "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                        getStatusColor(
                          contacts.find((c) => c.id === activeChat)?.status ||
                            "offline",
                        ),
                      ])}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {contacts.find((c) => c.id === activeChat)?.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {contacts.find((c) => c.id === activeChat)?.status ===
                      "online"
                        ? "Online agora"
                        : `Visto por último ${formatLastSeen(contacts.find((c) => c.id === activeChat)?.lastSeen!)}`}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline-secondary" size="sm">
                      <Lucide icon="Phone" className="w-4 h-4" />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <Lucide icon="Video" className="w-4 h-4" />
                    </Button>
                    <Menu>
                      <Menu.Button
                        as={Button}
                        variant="outline-secondary"
                        size="sm"
                      >
                        <Lucide icon="MoreVertical" className="w-4 h-4" />
                      </Menu.Button>
                      <Menu.Items className="w-40">
                        <Menu.Item>
                          <Lucide icon="Search" className="w-4 h-4 mr-2" />{" "}
                          Buscar
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="Archive" className="w-4 h-4 mr-2" />{" "}
                          Arquivar
                        </Menu.Item>
                        <Menu.Item>
                          <Lucide icon="Trash" className="w-4 h-4 mr-2" />{" "}
                          Excluir
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-5 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={clsx([
                          "flex",
                          message.senderId === "current-user"
                            ? "justify-end"
                            : "justify-start",
                        ])}
                      >
                        <div
                          className={clsx([
                            "max-w-xs lg:max-w-md px-4 py-2 rounded-lg",
                            message.senderId === "current-user"
                              ? "bg-primary text-white"
                              : "bg-slate-100 dark:bg-darkmode-400",
                          ])}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={clsx([
                              "text-xs mt-1",
                              message.senderId === "current-user"
                                ? "text-white/70"
                                : "text-slate-500",
                            ])}
                          >
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-slate-100 dark:bg-darkmode-400 px-4 py-2 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-5 border-t border-slate-200 dark:border-darkmode-400">
                  <div className="flex items-center space-x-3">
                    <Button variant="outline-secondary" size="sm">
                      <Lucide icon="Paperclip" className="w-4 h-4" />
                    </Button>
                    <div className="flex-1">
                      <FormInput
                        type="text"
                        placeholder="Digite sua mensagem..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Lucide icon="Send" className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Lucide
                    icon="MessageCircle"
                    className="w-16 h-16 mx-auto text-slate-400 mb-4"
                  />
                  <h3 className="text-lg font-medium text-slate-600">
                    Selecione uma conversa
                  </h3>
                  <p className="text-slate-500">
                    Escolha um contato para começar a conversar
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* END: Chat Content */}
      </div>

      {/* Group Modal */}
      <Dialog open={showGroupModal} onClose={() => setShowGroupModal(false)}>
        <Dialog.Panel>
          <Dialog.Title>
            <h2 className="mr-auto text-base font-medium">Nova Conversa</h2>
          </Dialog.Title>
          <Dialog.Description>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Selecionar contatos:
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {contacts.map((contact) => (
                    <label
                      key={contact.id}
                      className="flex items-center p-2 hover:bg-slate-100 rounded"
                    >
                      <input type="checkbox" className="mr-3" />
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <span className="text-sm">{contact.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Footer>
            <Button
              variant="outline-secondary"
              onClick={() => setShowGroupModal(false)}
              className="w-20 mr-1"
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => setShowGroupModal(false)}
              className="w-20"
            >
              Criar
            </Button>
          </Dialog.Footer>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}

export default Main;
