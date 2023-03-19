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
  let empHistoryData = useRef([]);
  let empHeight = useRef();
  let a;

  // rendering functions
  function returnEmployments() {
    return formData.empHistory.map((emp, index) => {
      if (emp.notNull) {
        console.log("y attr is and then emphistorydata");
        console.log(employmentsRef.current.height());
        console.log(empHistoryData.current);
        console.log(
          "employement height is " + employmentsRef.current.getHeight()
        );
        let height =
          employmentsRef.current.attrs.y + employmentsRef.current.getHeight();
        console.log("height before", height);
        for (let i = 0; i < empHistoryData.current.length; i++) {
          if (empHistoryData.current[i]) {
            console.log("inside for id", i);
            height += empHistoryData.current[i].getHeight();
            console.log(
              "inside and id height  is",
              i,
              empHistoryData.current[i].getHeight()
            );
            console.log("inside and height is", height);
          }
          console.log("outside  and final height is", height);
        }

        return (
          <Group
            verticalAlign="top"
            ref={(node) => (empHistoryData.current[index] = node)}
          >
            <Rect height={4} width={300} y={260}></Rect>
            <Text // Employment name and employer
              width={300}
              fontFamily="Poppins"
              text={emp.jobTitle + ", " + emp.employer}
              verticalAlign="top"
              y={264}
              x={125}
              fontSize={7}
              fontStyle="bold"
            />
            <Text // employment date
              width={300}
              verticalAlign="top"
              fontFamily="Poppins"
              text={emp.begin + " - " + emp.end}
              y={264}
              x={370}
              fontSize={7}
              fontStyle="bold"
            />
            <Text // Employment Description
              width={320}
              verticalAlign="top"
              fontFamily="Poppins"
              text={emp.description}
              y={275}
              x={125}
              fontSize={7}
            />
          </Group>
        );
      }
    });
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
          text={formData.occupation}
          y={
            nameRef?.current?.getHeight()
              ? nameRef.current.getHeight() + 60
              : 80
          }
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
          text={formData.professionalSummary}
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
            text={`${formData.address} , ${formData.city} - ${formData.postalCode} ${formData.country}`}
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
            y={
              addressRef?.current?.getHeight()
                ? 224 + addressRef.current.getHeight()
                : 234
            }
            x={30}
          />
          {/* Address */}
          <Text
            ref={phoneRef}
            width={82}
            fontFamily="Poppins"
            text={formData.phone}
            lineHeight="1.2"
            x={30}
            y={
              addressRef?.current?.getHeight()
                ? 240 + addressRef?.current?.getHeight()
                : 249
            }
            fontSize={7}
          />
          {/* Email */}
          <Text
            width={300}
            fontFamily="Poppins"
            fontStyle="bold"
            text="Email"
            fontSize={9}
            y={
              addressRef?.current?.getHeight()
                ? 255 + addressRef?.current?.getHeight()
                : 275
            }
            x={30}
          />
          <Text
            width={90}
            fontFamily="Poppins"
            text={formData.email}
            lineHeight="1.2"
            x={30}
            y={
              addressRef?.current?.getHeight()
                ? 270 + addressRef?.current?.getHeight()
                : 290
            }
            fontSize={7}
          />
        </Group>
        {/* Languages */}
        <Group
          ref={languagesRef}
          y={
            infoGroupRef?.current?.getHeight()
              ? infoGroupRef?.current?.getHeight() + 5
              : 155
          }
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
          y={
            infoGroupRef?.current?.getHeight()
              ? infoGroupRef?.current?.getHeight() +
                languagesRef?.current?.getHeight() +
                10
              : 155
          }
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
          y={
            summaryRef?.current?.getHeight()
              ? summaryRef.current.getHeight() - 10
              : 0
          }
        >
          {/* Employment History Title  */}
          <Text
            fontFamily="Poppins"
            fontStyle="bold"
            text="Employment History"
            y={229}
            // y={
            //   summaryRef?.current?.getHeight()
            //     ? summaryRef.current.getHeight() - 10
            //     : 0
            // }
            x={125}
            fontSize={14}
          />
          <Rect height={4} width={320} fill="black" y={249} x={125} />
          {/* Professional Summary Title  End */}
          {/* Employments  Start */}
          {/* emplyement space */}
          {returnEmployments()}
          {/* Employments  End */}
        </Group>
        {/* Education History Start   */}
      </Layer>
    </Stage>
  );
}

export default KonvaCanvas;
