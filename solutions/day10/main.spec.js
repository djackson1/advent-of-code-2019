const chai = require('chai')
const { expect } = chai
const { countMaxAsteroids } = require('./main')

describe('day 10', () => {
  describe('part a examples', () => {
    const examples = [
      [
        `.#..#
        .....
        #####
        ....#
        ...##`,
        8,
      ],
      [
        `......#.#.
        #..#.#....
        ..#######.
        .#.#.###..
        .#..#.....
        ..#....#.#
        #..#....#.
        .##.#..###
        ##...#..#.
        .#....####`,
        33,
      ],
      [
        `#.#...#.#.
        .###....#.
        .#....#...
        ##.#.#.#.#
        ....#.#.#.
        .##..###.#
        ..#...##..
        ..##....##
        ......#...
        .####.###.`,
        35,
      ],
      [
        `.#..#..###
        ####.###.#
        ....###.#.
        ..###.##.#
        ##.##.#.#.
        ....###..#
        ..#.#..#.#
        #..#.#.###
        .##...##.#
        .....#.#..`,
        41,
      ],
      [
        `.#..##.###...#######
        ##.############..##.
        .#.######.########.#
        .###.#######.####.#.
        #####.##.#.##.###.##
        ..#####..#.#########
        ####################
        #.####....###.#.#.##
        ##.#################
        #####.##.###..####..
        ..######..##.#######
        ####.##.####...##..#
        .#####..#.######.###
        ##...#.##########...
        #.##########.#######
        .####.#.###.###.#.##
        ....##.##.###..#####
        .#.#.###########.###
        #.#.#.#####.####.###
        ###.##.####.##.#..##`,
        210,
      ],
    ]

    examples.forEach(([grid, expectedAsteroids], id) => {
      it(`example ${id} should calculate the correct amount of asteroids`, () => {
        expect(countMaxAsteroids(grid.split('\n'))).to.equal(expectedAsteroids)
      })
    })
  })

  describe('part b examples', () => {
    // tests
  })
})
