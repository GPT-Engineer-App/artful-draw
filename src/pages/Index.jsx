import React, { useRef, useState, useEffect } from "react";
import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#000000", "#FF0000", "#FFFF00", "#0000FF", "#FFFFFF"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(15);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    context.fillStyle = "#000000"; // Set the background color to black
    context.fillRect(0, 0, canvas.width, canvas.height); // Fill the canvas with black color
    setCtx(context);
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
    }
  }, [color, brushSize, ctx]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    ctx.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" width="100vw" height="100vh" bg="#000000">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <Flex
        position="absolute"
        bottom={0}
        width="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        <Flex>
          {colors.map((c) => (
            <IconButton
              key={c}
              aria-label={c}
              icon={<FaCircle color={c} />}
              onClick={() => setColor(c)}
              border={color === c ? "2px solid black" : "none"}
              m={1}
            />
          ))}
        </Flex>
        <Flex ml={4}>
          {brushSizes.map((size) => (
            <IconButton
              key={size}
              aria-label={`${size}px`}
              icon={<FaCircle size={size} />}
              onClick={() => setBrushSize(size)}
              border={brushSize === size ? "2px solid black" : "none"}
              m={1}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Index;