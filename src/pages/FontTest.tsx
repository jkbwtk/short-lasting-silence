import MaterialSymbol from '#components/MaterialSymbol';
import style from '#styles/FontTest.module.scss';

const FontTest: Component = () => {
  return (
    <div class={style.container}>
      <div>
        <span class={style.bigFont}>Big Font: TEST 123 test TEST</span>
        <span class={style.bigFont}>1</span>
        <MaterialSymbol symbol="check_box" size="big" color="blue" />
      </div>
      <div>
        <span class={style.defaultFont}>Default Font: TEST 123 test TEST</span>
        <span class={style.defaultFont}>2</span>
        <MaterialSymbol
          symbol="cloud_upload"
          size="medium"
          color="gray"
          interactive={true}
          highlightColor="primary"
        />
        <span class={style.testBox} />
        {/* <span
          classList={{
            [style.defaultFont]: true,
            [style.cuTest]: true,
          }}
        >
          ├─┼─┤
        </span> */}
      </div>
      <div>
        <span class={style.altFont}>Alt Font: TEST 123 test TEST</span>
        <span class={style.altFont}>3</span>
        <MaterialSymbol symbol="check_box" size="alt" color="green" />
      </div>
      <div>
        <span class={style.smallFont}>Small Font: TEST 123 test TEST</span>
        <span class={style.smallFont}>4</span>
        <MaterialSymbol symbol="check_box" size="small" color="red" />
      </div>
      <div>
        <span class={style.tinyFont}>Tiny Font: TEST 123 test TEST</span>
        <span class={style.tinyFont}>5</span>
        <MaterialSymbol symbol="check_box" size="tiny" color="yellow" />
      </div>
    </div>
  );
};

export default FontTest;
