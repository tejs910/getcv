import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Stage,
  Layer,
  Rect,
  Circle,
  Image,
  Text,
  Group,
  Line,
} from "react-konva";
function KonvaCanvas() {
  const formData = useSelector((state) => state.formStore);
  let stageRef = useRef();
  let LayerRef = useRef();
  let nameRef = useRef();
  let summaryRef = useRef();
  let infoGroupRef = useRef();
  let addressRef = useRef();
  let phoneRef = useRef();
  let languagesRef = useRef();
  let employmentsRef = useRef();
  let educationsRef = useRef();
  let occupationRef = useRef();
  let a;
  const count = useRef(0);
  useEffect(() => {
    console.log("inside for " + count.current);
    count.current++;
    // occupationRef.
    // return nameRef ? 60 + nameRef.getClientRect().height : 80;
    console.log(nameRef);
    console.log(occupationRef.current.attrs.y);
    occupationRef.current.attrs.y = nameRef.current
      ? 60 + nameRef.current.attrs.y
      : 80;
    // if (nameRef.current)
    //   occupationRef.attrs.y = nameRef.current
    //     ? 60 + nameRef.current.getClientRect().height
    //     : 80;
    console.log(occupationRef.current.attrs.y);
  }, [nameRef]);

  function calculateIt() {
    console.log("nameref is");
    console.log(nameRef);
    // return nameRef ? 60 + nameRef.getClientRect().height : 80;
    return 80;
  }
  return (
    <Stage width={470} height={640} ref={stageRef}>
      <Layer y={0} x={0} ref={LayerRef} background="#fff">
        {a != null ? (
          // eslint-disable-next-line jsx-a11y/alt-text
          <Image x={30} y={30} height={85} width={85} image={a}></Image>
        ) : (
          <Group x={-20}>
            <Rect
              stroke="#080808"
              height={70}
              width={70}
              x={50}
              y={40}
              strokeWidth={2}
            />
            <Text
              width={300}
              height={200}
              fontFamily="Poppins"
              fontStyle="bold"
              text={"photo"}
              fontSize={9}
              y={70}
              x={72}
            />
          </Group>
        )}
        {/* First Name And Last Name */}
        <Text
          width={300}
          fontFamily="Poppins"
          fontStyle="bold"
          text={formData.firstName + " " + formData.lastName}
          y={50}
          x={130}
          fontSize={20}
          ref={nameRef}
        />
        {/* occupation */}
        <Text
          width={260}
          height={200}
          fontFamily="Poppins"
          text={"Web developer"}
          y={80}
          x={130}
          fontSize={15}
          ref={occupationRef}
        />
        {/* Content*/}
        {/* Professional Summary Title  */}
        <Text
          width={300}
          height={200}
          fontFamily="Poppins"
          fontStyle="bold"
          text="Professional Summary"
          y={160}
          x={125}
          fontSize={15}
        />
        <Rect height={4} width={320} fill="black" y={185} x={125} />
        {/* Professional Summary Start   */}
        <Text
          width={333}
          ref={summaryRef}
          fontFamily="Poppins"
          text="It's my summary text It's my summary text It's my summary text It's my summary text It's my summary text"
          y={200}
          x={125}
          lineHeight="1.2"
          fontSize={7}
        />
        {/* Professional Summary Title  End */}
        <Group ref={infoGroupRef}>
          {/* Professional Summary  End */}
          {/* Info Title  */}
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Info"
            y={160}
            x={30}
            fontSize={15}
          />
          <Rect height={4} width={30} fill="black" y={185} x={30} />
          {/* Info Content Start  */}
          {/* Address */}
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Address"
            y={200}
            x={30}
            fontSize={9}
          />
          <Text
            width={82}
            ref={addressRef}
            fontFamily="Poppins"
            text="Baroda"
            lineHeight="1.2"
            y={217}
            x={30}
            fontSize={7}
          />
          {/* Address */}
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Phone"
            fontSize={9}
            // y={addressRef ? 224 + addressRef.getClientRect().height : 234}
            y="234"
            x={30}
          />
          {/* Address */}
          <Text
            ref={phoneRef}
            width={82}
            fontFamily="Poppins"
            text="44654656"
            lineHeight="1.2"
            x={30}
            // y={addressRef ? 240 + addressRef.getClientRect().height : 249}
            y="249"
            fontSize={7}
          />
          {/* Email */}
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Email"
            fontSize={9}
            // y={addressRef ? 255 + addressRef.getClientRect().height : 275}
            y="275"
            x={30}
          />
          <Text
            width={90}
            fontFamily="Poppins"
            text="tejasgokani@gg.cxom"
            lineHeight="1.2"
            x={30}
            // y={addressRef ? 270 + addressRef.getClientRect().height : 290}
            y="290"
            fontSize={7}
          />
        </Group>
        {/* Languages */}
        <Group
          ref={languagesRef}
          //   y={infoGroupRef ? infoGroupRef.getClientRect().height + 5 : 155}
          y="155"
        >
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Languages"
            y={160}
            x={30}
            fontSize={14}
          />
          <Rect height={4} width={30} fill="black" y={178} x={30} />
          <Group y={178} x={30}>
            {/* Language 1 */}
            <Text
              width={300}
              fontFamily="Poppins"
              fontStyle="bold"
              text="Languages"
              y={178}
              x={30}
              fontSize={14}
            />
            {/* space for languages */}
            <Text
              width={300}
              fontFamily="Poppins"
              fontStyle="bold"
              text="Languages"
              y={178}
              x={48}
              fontSize={14}
            />
          </Group>
        </Group>
        {/* Skills */}
        <Group
          //   y={
          //     infoGroupRef
          //       ? infoGroupRef.getClientRect().height +
          //         languagesRef.getClientRect().height +
          //         10
          //       : 155
          //   }
          y="155"
        >
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Skills"
            y={160}
            x={30}
            fontSize={14}
          />
          <Rect height={4} width={30} fill="black" y={180} x={30} />
          {/* space for skills */}
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="my skills"
            y={195}
            x={30}
            fontSize={14}
          />
        </Group>
        {/* empolyement history */}
        <Group
          width={300}
          ref={employmentsRef}
          //   y={summaryRef ? summaryRef.getClientRect().height - 10 : 0}
          y="0"
        >
          {/* Employment History Title  */}
          <Text
            fontFamily="Poppins"
            fontStyle="bold"
            text="Employment History"
            y={229}
            x={125}
            fontSize={14}
          />
          <Rect height={4} width={320} fill="black" y={249} x={125} />
          {/* Professional Summary Title  End */}
          {/* Employments  Start */}
          {/* emplyement space */}
          <Text
            fontFamily="Poppins"
            fontStyle="bold"
            text="Employment History will be here....."
            y={249}
            x={125}
            fontSize={14}
          />
          {/* Employments  End */}
        </Group>
        {/* Education History Start   */}
        <Group
          ref={educationsRef}
          //   y={
          //     summaryRef
          //       ? summaryRef.getClientRect().height +
          //         employmentsRef.getClientRect().height -
          //         40
          //       : 0
          //   }
          y="0"
        >
          {/* Education History Title  */}
          <Text
            width={300}
            height={200}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Education History"
            y={264}
            x={125}
            fontSize={14}
          />
          <Rect height={4} width={320} fill="black" y={284} x={125} />
          {/* Education History Title  End */}
          {/* Educations  Start */}
          {/* Here Education list goes */}
          {/* education will be here */}
          <Text
            width={300}
            height={200}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Education History"
            y={295}
            x={125}
            fontSize={14}
          />
          {/* Educations  End */}
        </Group>
      </Layer>
    </Stage>
  );
}

export default KonvaCanvas;
