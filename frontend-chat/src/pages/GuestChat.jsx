/* eslint-disable react/prop-types */
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiUser, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import apiURL from "../../utils";

const GUEST_ROOM_NAME = "Guest Lounge";
const ENDPOINT = apiURL;

const GuestChat = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [guestName, setGuestName] = useState("");
  const [tempName, setTempName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const [guestRoomId] = useState("guest-public-room");
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const toast = useToast();
  const navigate = useNavigate();

  // Open the name modal on mount
  useEffect(() => {
    onOpen();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Connect socket once guest name is set
  useEffect(() => {
    if (!guestName) return;

    const guestUser = {
      _id: `guest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      username: guestName,
      isGuest: true,
    };

    const newSocket = io(ENDPOINT, {
      auth: { user: guestUser },
    });

    newSocket.on("connect", () => {
      newSocket.emit("join room", guestRoomId);
      // Push a local welcome message
      setMessages([
        {
          _id: "welcome",
          content: `Welcome, ${guestName}! You are chatting as a guest. Messages are visible to everyone in this room.`,
          sender: { username: "System", _id: "system" },
          createdAt: new Date().toISOString(),
          isSystem: true,
        },
      ]);
    });

    newSocket.on("message receive", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    newSocket.on("users in room", (users) => {
      setConnectedUsers(users);
    });

    newSocket.on("user joined", (user) => {
      setConnectedUsers((prev) => [...prev, user]);
      setMessages((prev) => [
        ...prev,
        {
          _id: `join_${Date.now()}`,
          content: `${user.username} joined the chat.`,
          sender: { username: "System", _id: "system" },
          createdAt: new Date().toISOString(),
          isSystem: true,
        },
      ]);
    });

    newSocket.on("user left", (userId) => {
      setConnectedUsers((prev) => {
        const leaving = prev.find((u) => u._id === userId);
        if (leaving) {
          setMessages((m) => [
            ...m,
            {
              _id: `leave_${Date.now()}`,
              content: `${leaving.username} left the chat.`,
              sender: { username: "System", _id: "system" },
              createdAt: new Date().toISOString(),
              isSystem: true,
            },
          ]);
        }
        return prev.filter((u) => u._id !== userId);
      });
    });

    newSocket.on("user typing", ({ username }) => {
      setTypingUsers((prev) => new Set(prev).add(username));
    });

    newSocket.on("user stop typing", ({ username }) => {
      setTypingUsers((prev) => {
        const next = new Set(prev);
        next.delete(username);
        return next;
      });
    });

    setSocket(newSocket);
    // Store guest info so ChatArea-like components work
    localStorage.setItem("guestInfo", JSON.stringify(guestUser));

    return () => {
      newSocket.emit("leave room", guestRoomId);
      newSocket.disconnect();
    };
  }, [guestName]);

  const handleStartChat = () => {
    const trimmed = tempName.trim();
    if (!trimmed) {
      toast({
        title: "Please enter a name",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setGuestName(trimmed);
    onClose();
  };

  const sendMessage = () => {
    if (!newMessage.trim() || !socket) return;

    const guestUser = JSON.parse(localStorage.getItem("guestInfo") || "{}");
    const msg = {
      _id: `guest_msg_${Date.now()}`,
      content: newMessage,
      sender: { _id: guestUser._id, username: guestUser.username },
      groupId: guestRoomId,
      createdAt: new Date().toISOString(),
    };

    socket.emit("new message", { ...msg, groupId: guestRoomId });
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");

    // Stop typing indicator
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    socket.emit("stop typing", { groupId: guestRoomId });
    setIsTyping(false);
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping && socket) {
      setIsTyping(true);
      socket.emit("typing", { groupId: guestRoomId, username: guestName });
    }
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (socket) socket.emit("stop typing", { groupId: guestRoomId });
      setIsTyping(false);
    }, 2000);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const guestUser = JSON.parse(localStorage.getItem("guestInfo") || "{}");

  return (
    <>
      {/* Name Entry Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => navigate("/")}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay backdropFilter="blur(6px)" bg="blackAlpha.600" />
        <ModalContent mx={4} borderRadius="2xl" overflow="hidden">
          <ModalHeader
            bg="blue.500"
            color="white"
            py={6}
            textAlign="center"
            fontSize="xl"
          >
            <Icon as={FiMessageCircle} mr={2} />
            Join as Guest
          </ModalHeader>
          <ModalBody py={8} px={6}>
            <VStack spacing={5}>
              <Text color="gray.600" textAlign="center">
                Enter a display name to start chatting. No account needed!
              </Text>
              <FormControl>
                <FormLabel fontWeight="semibold">Your Name</FormLabel>
                <Input
                  placeholder="e.g. John Doe"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  focusBorderColor="blue.400"
                  size="lg"
                  onKeyPress={(e) => e.key === "Enter" && handleStartChat()}
                  autoFocus
                />
              </FormControl>
              <Button
                colorScheme="blue"
                size="lg"
                width="full"
                borderRadius="full"
                leftIcon={<Icon as={FiUser} />}
                onClick={handleStartChat}
                _hover={{ bg: "blue.600", transform: "translateY(-1px)" }}
                transition="all 0.2s"
              >
                Start Chatting
              </Button>
              <Button
                variant="ghost"
                size="sm"
                colorScheme="gray"
                onClick={() => navigate("/")}
              >
                Go back
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Chat UI — shown after name is entered */}
      {guestName && (
        <Flex h="100vh" direction="column" bg="gray.50">
          {/* Header */}
          <Flex
            px={6}
            py={4}
            bg="blue.500"
            color="white"
            align="center"
            justify="space-between"
            boxShadow="md"
            flexShrink={0}
          >
            <Flex align="center" gap={3}>
              <Icon as={FiMessageCircle} fontSize="22px" />
              <Box>
                <Text fontWeight="bold" fontSize="lg">
                  {GUEST_ROOM_NAME}
                </Text>
                <Text fontSize="xs" opacity={0.85}>
                  Chatting as{" "}
                  <Text as="span" fontWeight="bold">
                    {guestName}
                  </Text>{" "}
                  (Guest)
                  {connectedUsers.length > 0 && (
                    <Text as="span">
                      {" "}
                      • {connectedUsers.length} online
                    </Text>
                  )}
                </Text>
              </Box>
            </Flex>
            <Flex align="center" gap={3}>
              <Badge colorScheme="whiteAlpha" variant="solid" bg="blue.400">
                Guest
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                color="white"
                _hover={{ bg: "blue.600" }}
                onClick={() => navigate("/")}
                leftIcon={<Icon as={FiX} />}
              >
                Exit
              </Button>
            </Flex>
          </Flex>

          {/* Messages */}
          <VStack
            flex="1"
            overflowY="auto"
            spacing={3}
            align="stretch"
            px={{ base: 3, md: 6 }}
            py={4}
            sx={{
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                background: "gray.300",
                borderRadius: "24px",
              },
            }}
          >
            {messages.map((message) => {
              if (message.isSystem) {
                return (
                  <Flex key={message._id} justify="center">
                    <Badge
                      colorScheme="gray"
                      variant="subtle"
                      px={3}
                      py={1}
                      borderRadius="full"
                      fontSize="xs"
                    >
                      {message.content}
                    </Badge>
                  </Flex>
                );
              }

              const isMe = message.sender._id === guestUser._id;
              return (
                <Box
                  key={message._id}
                  alignSelf={isMe ? "flex-end" : "flex-start"}
                  maxW={{ base: "85%", md: "65%" }}
                >
                  <Flex
                    direction="column"
                    align={isMe ? "flex-end" : "flex-start"}
                    gap={1}
                  >
                    <Flex
                      align="center"
                      gap={2}
                      flexDirection={isMe ? "row-reverse" : "row"}
                    >
                      <Avatar
                        size="xs"
                        name={message.sender.username}
                        bg={isMe ? "blue.500" : "gray.400"}
                        color="white"
                      />
                      <Text fontSize="xs" color="gray.500">
                        {isMe ? "You" : message.sender.username} •{" "}
                        {formatTime(message.createdAt)}
                      </Text>
                    </Flex>
                    <Box
                      bg={isMe ? "blue.500" : "white"}
                      color={isMe ? "white" : "gray.800"}
                      px={4}
                      py={2.5}
                      borderRadius={
                        isMe ? "2xl 2xl 4px 2xl" : "2xl 2xl 2xl 4px"
                      }
                      boxShadow="sm"
                    >
                      <Text fontSize="sm">{message.content}</Text>
                    </Box>
                  </Flex>
                </Box>
              );
            })}

            {/* Typing indicators */}
            {Array.from(typingUsers)
              .filter((u) => u !== guestName)
              .map((username) => (
                <Flex key={username} align="center" gap={2} maxW="60%">
                  <Avatar size="xs" name={username} bg="gray.400" color="white" />
                  <Flex
                    align="center"
                    gap={1}
                    bg="white"
                    px={3}
                    py={2}
                    borderRadius="2xl 2xl 2xl 4px"
                    boxShadow="sm"
                  >
                    <Text fontSize="xs" color="gray.500" fontStyle="italic">
                      {username} is typing
                    </Text>
                    {[1, 2, 3].map((dot) => (
                      <Box
                        key={dot}
                        w="4px"
                        h="4px"
                        borderRadius="full"
                        bg="gray.400"
                      />
                    ))}
                  </Flex>
                </Flex>
              ))}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Input */}
          <Box
            p={4}
            bg="white"
            borderTop="1px solid"
            borderColor="gray.200"
            flexShrink={0}
          >
            <InputGroup size="lg">
              <Input
                value={newMessage}
                onChange={handleTyping}
                placeholder="Type a message..."
                pr="4.5rem"
                bg="gray.50"
                border="1px solid"
                borderColor="gray.200"
                borderRadius="full"
                _focus={{ boxShadow: "none", bg: "gray.100", borderColor: "blue.300" }}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="2rem"
                  size="sm"
                  colorScheme="blue"
                  borderRadius="full"
                  _hover={{ transform: "translateY(-1px)" }}
                  transition="all 0.2s"
                  onClick={sendMessage}
                  isDisabled={!newMessage.trim()}
                >
                  <Icon as={FiSend} />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Text fontSize="xs" color="gray.400" mt={2} textAlign="center">
              You are chatting as a guest — messages are public to this room
            </Text>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default GuestChat;
