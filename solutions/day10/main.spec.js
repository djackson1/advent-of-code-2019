const chai = require('chai')
const { expect } = chai
const { countMaxAsteroids, getAsteroidVaporizeSequence } = require('./main')

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
    const example1 = [
      `.#....#####...#..
      ##...##.#####..##
      ##...#...#.#####.
      ..#.....#...###..
      ..#.#.....#....##`,
      { x: 8, y: 3 },
    ]

    it('should find the sequence of asteroids to vaporize correctly', () => {
      const sequence = getAsteroidVaporizeSequence(example1[0].split('\n'), example1[1])

      expect(sequence[0].x).to.equal(8)
      expect(sequence[0].y).to.equal(1)

      const last = sequence[sequence.length - 1]
      expect(last.x).to.equal(14)
      expect(last.y).to.equal(3)
    })

    const example2 = [
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
      { x: 11, y: 13 },
    ]

    it('should find the correct sequence to vaporize asteroids', () => {
      const sequence = getAsteroidVaporizeSequence(example2[0].split('\n'), example2[1])

      expect(sequence[199].x).to.equal(8)
      expect(sequence[199].y).to.equal(2)
    })
  })
})
