import { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "@mock/(.*)": "<rootDir>src/infra/mock/$1",
    "@api/(.*)": "<rootDir>src/infra/api/$1",
    "@cache/(.*)": "<rootDir>src/core/cache/$1",
    "@static/(.*)": "<rootDir>src/core/static/$1",
    "@interfaces/(.*)": "<rootDir>src/core/interfaces/$1",
    "@typing/(.*)": "<rootDir>src/core/domain/types/$1",
    "@models/(.*)": "<rootDir>src/core/domain/models/$1",
    "@services/(.*)": "<rootDir>src/core/services/$1",
    "@utils/(.*)": "<rootDir>src/core/utils/$1",
    "@components/(.*)": "<rootDir>src/ui/components/$1",
    "@contexts/(.*)": "<rootDir>src/ui/contexts/$1",
    "@tests/(.*)": "<rootDir>src/tests/$1",
  },
};

export default config;
