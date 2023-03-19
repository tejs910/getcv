// at last
<Group
  ref={educationsRef}
  y={
    summaryRef?.current?.getHeight()
      ? summaryRef?.current?.getHeight() +
        employmentsRef?.current?.getHeight() -
        40
      : 0
  }
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
</Group>;
