import { ComponentProps, createEffect, createSignal } from "solid-js";
import { z } from "zod";

export interface FormOptions<Output, Def extends z.ZodTypeDef, Input> {
  schema: z.Schema<Output, Def, Input>;
}

export type FormErrors<Input> = { [K in keyof Input]?: string };

export function createForm<Output, Def extends z.ZodTypeDef, Input>({
  schema,
}: FormOptions<Output, Def, Input>) {
  const [fields, setFields] = createSignal<Record<string, string>>({});
  const [errors, setErrors] = createSignal<FormErrors<Input>>({});

  return {
    state: {
      errors,
    },

    register: (field: keyof Input): ComponentProps<"input"> => ({
      onChange: (event) => {
        setErrors(
          (errors) =>
            Object.fromEntries(
              Object.entries(errors).filter(([key, value]) => key !== field),
            ) as FormErrors<Input>,
        );
        return setFields((fields) => ({
          ...fields,
          [field]: event.currentTarget.value,
        }));
      },
    }),

    handleSubmit: (fn: (value: Output) => void) => async (event: Event) => {
      event.preventDefault();
      try {
        const output = await schema.parseAsync(fields());
        fn(output);
      } catch (error) {
        if (error instanceof z.ZodError) {
          const newErrors = error.errors.reduce(
            (acc, issue) => ({ ...acc, [issue.path[0]]: issue.message }),
            {} as FormErrors<Input>,
          );

          setErrors(() => newErrors);

          return;
        }

        throw error;
      }
    },
  };
}
